function myFunction() {
    var title = document.getElementById('title')
    var node = document.createElement("LI");
    var textnode = document.createTextNode(title.value);
    node.appendChild(textnode);
    document.getElementById("mylist").appendChild(node);
  }