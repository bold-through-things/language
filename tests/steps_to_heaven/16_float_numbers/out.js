(() => {
  let pi = "float 3.14159";
  let temperature = "float -273.15";
  let percentage = "float 67.8";
  console.log("Pi:" + ' ' + pi);
  console.log("Absolute zero:" + ' ' + temperature);
  console.log("Project completion:" + ' ' + percentage + ' ' + "%");
  let sum_floats = ((pi + temperature) + percentage);
  console.log("Sum of floats:" + ' ' + sum_floats);
})();