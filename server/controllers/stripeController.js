const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Course = require('../models/Course');
const User = require('../models/User');

// Create a Stripe checkout session for a course purchase
exports.createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const courseId = req.params.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: Math.round(course.price * 100),
            product_data: {
              name: course.title,
              description: course.description,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        courseId,
      },
      client_reference_id: userId,
      success_url: `${process.env.FRONTEND_URL}/courses/${courseId}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/courses/${courseId}`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout session creation failed:', err);
    res.status(500).json({ error: 'Stripe checkout session creation failed' });
  }
};

// Handle Stripe webhook events
exports.webhookHandler = async (req, res) => {
  const signature = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const courseId = session.metadata.courseId;

    // Enroll the user after payment
    try {
      const user = await User.findById(userId);
      if (user && !user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
        await user.save();
      }
      await Course.findByIdAndUpdate(courseId, { $addToSet: { enrolledStudents: userId } });
    } catch (err) {
      console.error('Error enrolling user after payment:', err);
    }
  }

  res.json({ received: true });
}; 