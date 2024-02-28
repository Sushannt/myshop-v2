const randomRobohashURL = () => {
  const baseRoboHashUrl = "https://robohash.org";

  const rNum = Math.floor(Math.random() * 1000) + 1;

  return `${baseRoboHashUrl}/stefan-${rNum}`;
};

export default randomRobohashURL;
