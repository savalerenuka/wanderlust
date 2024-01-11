const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async(req, res) => {
    // console.log(req.params.id);
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.reviews);
    // console.log(newReview);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
  
    await newReview.save();
    await listing.save();
  
    // console.log("new review saved");
    // res.send("new review saved");

    req.flash("success", "New Review Created!");
  
    res.redirect(`/listings/${listing._id}`);
}


module.exports.destroyReview = async(req, res)=>{
    let {id, reviewId}  = req.params;
  
    await Listing.findByIdAndUpdate(id, {$pull: {review: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted!");

    res.redirect(`/listings/${id}`)
}