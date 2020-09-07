const GetAxiosConfig = (task: string) => {
  const userDataObj = localStorage.getItem("userDataObj");

  if (userDataObj) {
    const convertedObj = JSON.parse(userDataObj);
    const userData = convertedObj.userData;
    const userPermission = convertedObj.userPermission;
    const axiosConfig = {
      headers: {
        "x-authorization": `${userPermission.id_token}`,
        "x-user-id": `${userData.id}`,
        "x-task": `${task}`,
      },
      responseType: 'arraybuffer'
    };

    return axiosConfig;
  } else {
    return {};
  }
};
export default GetAxiosConfig;
