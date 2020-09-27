const getRatingsByUsers = (usersRatings) => {
  const ratingsByUsers = {};

  for (let post of usersRatings) {
    if (!ratingsByUsers[post.user_id]) {
      ratingsByUsers[post.user_id] = {
        userId: post.user_id,
        name: post.name,
        //lastName: post.last_name,
        email: post.email,
        posts: [],
      };
    }


    ratingsByUsers[post.user_id].posts.push({
      comment: post.comment,
      rating: post.rating,
    });
    

  }

  return Object.values(ratingsByUsers);
};

const getServicesBySellers = (services) => {
  const servicesBySellers = {};

  for (let post of services) {
    if (!servicesBySellers[post.user_id]) {
      servicesBySellers[post.user_id] = {
        userId: post.user_id,
        name: post.name,
        //lastName: post.last_name,
        email: post.email,
        posts: [],
      };
    }


    servicesBySellers[post.user_id].posts.push({
      comment: post.comment,
      rating: post.rating,
    });
    

  }

  return Object.values(servicesBySellers);
};

module.exports = {
  getRatingsByUsers,
  getServicesBySellers
};