function openModal() {
    document.getElementById('fileID').click();
    return false;
}

function afterSelection() {
    var name = document.getElementById("fileID").value;
    name = name.substr(name.lastIndexOf("\\") + 1);
    document.getElementById("fileName").innerText = name;
    document.getElementById("upload").style.visibility = "visible";
}