const requestHelper = ({url, method, data}) => {
  const params = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (data) {
    params.body = JSON.stringify(data);
  }
  return fetch(url, params)
    .then(res => res.json())
    .then(body => ({ body }))
    .catch(err => err);
};

export const fetchThreads = () => {
  const url = `/api/threads/`;
  const method = 'GET';
  return requestHelper({url, method});
};

export const createThread = (topic) => {
  console.log("this is called");
  const url = '/api/threads/create';
  const method = 'POST';
  const data = { topic };
  return requestHelper({url, method, data});
};

export const upVote = ({topic, date}) => {
  console.log("this is called");
  const id = topic+date;
  const url = '/api/threads/${id}/vote';
  const method = 'PUT';
  const data = { vote: true };
  return requestHelper({url, method, data});
};

