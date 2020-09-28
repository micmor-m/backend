const getRatingsByUsers = (usersRatings) => {
  const ratingsByUsers = {};

  for (let rate of usersRatings) {
    if (!ratingsByUsers[rate.user_id]) {
      ratingsByUsers[rate.user_id] = {
        userId: rate.user_id,
        username: rate.username,
        //lastName: post.last_name,
        //email: rate.email,
        rate: [],
      };
    }


    ratingsByUsers[rate.user_id].rate.push({
      comment: rate.comment,
      rating: rate.rating,
    });
    

  }

  return Object.values(ratingsByUsers);
};

const getServicesBySellers = (services) => {
  const servicesBySellers = {};

  for (let service of services) {
    if (!servicesBySellers[service.id]) {
      servicesBySellers[service.id] = {
        cleanerId: service.id,
        cleanerName: service.username,
        email: service.email,
        description: service.description,
        address: service.address,
        latitude: service.latitude,
        longitude: service.longitude,
        picture_url: service. picture_url,
        phone: service.phone,
        service: [],
      };
    }


    servicesBySellers[service.id].service.push({
      service: service.service,
      price: service.price,
      typeofservice: service.typeofservice,
      deposit: service.deposit
    });
    

  }

  return Object.values(servicesBySellers);
};

const getServicesBySeller = (services) => {
  const servicesBySeller = {};

  for (let service of services) {
    if (!servicesBySeller[service.id]) {
      servicesBySeller[service.id] = {
        cleanerId: service.id,
        cleanerName: service.username,
        email: service.email,
        description: service.description,
        latitude: service.latitude,
        longitude: service.longitude,
        address: service.address,
        picture_url: service. picture_url,
        phone: service.phone,
        service: [],
      };
    }


    servicesBySeller[service.id].service.push({
      service: service.service,
      price: service.price,
      typeofservice: service.typeofservice,
      deposit: service.deposit
    });
    

  }

  return Object.values(servicesBySeller);
};

module.exports = {
  getRatingsByUsers,
  getServicesBySellers,
  getServicesBySeller
};