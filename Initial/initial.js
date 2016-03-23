function getInitial(name) {
  var splittedNames = name.split(' ');
  var initial;
  var mergedInitials = splittedNames.map(function(name) {
    return name.substring(0,1);
  });
  if(mergedInitials.length > 1)
    initial = mergedInitials.join('').substring(0,2);
  else
    initial = mergedInitials.join('').substring(0,1);
  return initial.toUpperCase();
};

module.exports = {
  getInitials : getInitial
};
