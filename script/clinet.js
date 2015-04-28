var xmlHttp = new XMLHttpRequest();

function xmlHttpRequest() {
    var URL = "http://192.168.81.202:8080/GetDateWithServlet?lanmuList";
    xmlHttp.open("GET", URL, false);
    xmlHttp.onreadystatechange = updatePage();
    xmlHttp.send(null);

}
//服务器XML文件解析
function updatePage() {
    var xmldoc;
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        var response =xmlHttp.responseText;
        var parse = new DOMParser();
        xmldoc = parse.parseFromString(response,"text/xml");
        lanmuList(xmldoc);
    }
}
//获取栏目
function lanmuList(xmldoc) {
    var result = xmldoc.getElementsByTagName("list");
    var booklist;
        for (var i=0; i<result.length; i++) {
            var name = result[i].getAttribute("name");
            var bookurl = result[i].firstChild.nodeValue;
            booklist = document.createElement("a");
            booklist.setAttribute("href",bookurl);
            var bookname = document.createTextNode(name);
            booklist.appendChild(bookname);
            var top = document.getElementById("top");
            top.appendChild(booklist);

            booklist.onclick = function() {
                var h1 = document.getElementById("h1");
                $(h1).empty();
                var right = document.getElementById("right")
                $(right).empty();
                var container = document.getElementById("container");
                $(container).empty();
                var left = document.getElementById("left");
                $(left).empty();
                var getbooklist = this.getAttribute("href");
                readBooklist(getbooklist);
                return false;
            }
    }
}
//获取书名
function readBooklist(getbooklist) {
    var URL = "http://192.168.81.202:8080/GetDateWithServlet?bookList="+getbooklist;
    xmlHttp.open("GET", URL, true);
    xmlHttp.onreadystatechange = bookupdatepage;
    xmlHttp.send(null);
}
function bookupdatepage() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        var response =xmlHttp.responseText;
        var parse = new DOMParser();
        var xmldoc = parse.parseFromString(response,"text/xml");
        bookList(xmldoc);
    }
}

//获取书名
function bookList(xmldoc) {
    var left = document.getElementById("left");
    var result = xmldoc.getElementsByTagName("list");
    for (var i=0; i<result.length; i++) {
        var getbookname = result[i].getAttribute("name");
        var getbookurl = result[i].firstChild.nodeValue;
        var booknamelist = document.createElement("a");
        var bookname = document.createTextNode(getbookname);
        booknamelist.setAttribute("href", getbookurl);
        booknamelist.appendChild(bookname);
        left.appendChild(booknamelist);
//        insterAfter(booknamelist,left);

        booknamelist.onclick = function() {
            var h1 = document.getElementById("h1");
            $(h1).empty();
            var container = document.getElementById("container");
            $(container).empty();
            var right = document.getElementById("right");
            $(right).empty();
            var readbookurl = this.getAttribute("href");
            bookget(readbookurl);
            return false;
            }
        }
}

//解析书名
function bookget(getbook) {
    var URL = "http://192.168.81.202:8080/GetDateWithServlet?readBook="+getbook;
    xmlHttp.open("GET", URL, false);
    xmlHttp.onreadystatechange = readfunc;
    xmlHttp.send(null);

}

function readfunc() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        var response =xmlHttp.responseText;
        var parse = new DOMParser();
        var xmldoc = parse.parseFromString(response,"text/xml");
        readbook(xmldoc);
    }
}

//阅读书籍
function readbook(xmldoc) {
    var gettitle = xmldoc.getElementsByTagName("h1");
    for (var j=0; j<gettitle.length; j++) {
        var gettitle_text = gettitle[j].firstChild.nodeValue;
        var title = document.createElement("h1");
        var title_text = document.createTextNode(gettitle_text);
        title.appendChild(title_text);
        var h1 = document.getElementById("h1");
        h1.appendChild(title);
    }
    var result = xmldoc.getElementsByTagName("p");
    for (var i=0; i<result.length; i++) {
        var content = result[i].firstChild.nodeValue;
        var p = document.createElement("p");
        var text = document.createTextNode(content);
        p.appendChild(text);
        var container = document.getElementById("container");
        container.appendChild(text);
    }
    var nextpage = document.createElement("a");
    nextpage.setAttribute("id","next");
    nextpage.setAttribute("href","#right");
    var page_text = document.createTextNode("下一页");
    nextpage.appendChild(page_text);
    var right = document.getElementById("right");
    right.appendChild(nextpage);
    nextpage.onclick = function() {
    }


}

//DOM插入方法
function insterAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}


//function readBooklist(bookURL) {
//    var URL = "http://192.168.81.202:8080/GetDateWithServlet?bookList="+ bookURL;
//    xmlHttp.open("GET", URL, false);
//    xmlHttp.onreadystatechange = updatePage;
//    xmlHttp.send(null);
//}
//addLoadEvent(getBooklist);


addLoadEvent(xmlHttpRequest);
addLoadEvent(updatePage);



