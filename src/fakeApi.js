export function fetchProfileData(id) {
  let userPromise = fetchUser(id);

  return {
    user: wrapPromise(userPromise),
  };
}
function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = "no user for current id ";
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}

function fetchUser(id) {
  const users = ['user1 ', 'user2', 'user3']
  return new Promise((resolve) => {
    if (users[id]) {
      setTimeout(() => {
        resolve({
          name: users[id]
        });
      }, 5000 * Math.random());
    }
    else resolve({
      name: 'no user for current id'
    })
  });
}

