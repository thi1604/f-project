const creatTree = (array = [], parent_id = "")=>{
  let newArray = [];
  array.forEach((item)=>{
    if(item.parent_id == parent_id){
      const childen = creatTree(array, item.id);
      if(childen.length > 0){
        item.childen = childen;
      }
      newArray.push(item);
    }
  });
  return newArray;
};

module.exports = (array) => {
  const Tree = creatTree(array);
  return Tree;
}