(() => {
  let global_var = "global";
  let shadow_var = "outer";
  console.log("Before do block:" + ' ' + global_var + ' ' + shadow_var);
  console.log("After do block:" + ' ' + global_var + ' ' + shadow_var);
})();