export const searchAPI = async (query) => {
  try {
    const response = await fetch(`https://api.github.com/search/users?q=${query}&per_page=5`);
    const obj = await response.json();
    return obj;
  } catch (error) {
    return new Error(error);
  }
}

export const requestUser = async (userName) => {
  try {
    const response = await fetch(`https://api.github.com/users/${userName}`);
    const obj = await response.json();
    return obj;
  } catch (error) {
    return new Error(error);
  }
}

export const requestRepo = async (userName) => {
  try {
    const response = await fetch(`https://api.github.com/users/${userName}/repos`);
    const obj = await response.json();
    return obj;
  } catch (error) {
    return new Error(error);
  }
}
