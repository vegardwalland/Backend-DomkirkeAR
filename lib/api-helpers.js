export function extractUser(req) {
  console.log("REQ " + req);
  console.log("extract = " + req.user);
    if (!req.user) return null;
    console.log("extract = null");
    // take only needed user fields to avoid sensitive ones (such as password)
    const {
      name, email,
    } = req.user;
    return {
      name, email,
    };
  }