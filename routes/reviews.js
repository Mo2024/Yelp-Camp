const express = require('express');
const router = express.Router({ mergeParams: true });
const Review = require('../models/review')
const { reviewSchema } = require('../schemas')
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')
const Campground = require('../models/campground');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const reviews = require('../controllers/reviews');


router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));


router.post('/', validateReview, catchAsync(reviews.createReview));

module.exports = router;