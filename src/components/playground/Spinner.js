.spinner {
    animation:rotate 3s infinite;
    display: inline-block;
    width:120px;
    height:120px;
    margin-bottom:40px;
}
.spinner:before{
    content:'';
    position:absolute;
    width:40px;
    height:40px;
    border:40px solid transparent;
    border-top-color:green;
    border-bottom-color:yellow;
    transform:rotate(-45deg);
    border-radius:50%;
    animation:rotate 2s infinite reverse linear;  
}

.spinner:after{
    content:'';
    position:absolute;
    width:40px;
    height:40px;
    border:40px solid transparent;
    border-right-color:red;
    border-left-color:blue;
    transform:rotate(-45deg);
    border-radius:50%;
    animation:rotate 2s infinite linear;
}

@keyframes rotate{
    0%{ transform:rotate(-45deg) }
    100%{ transform:rotate(315deg) }
}

 var spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }`

var styles = {
    border: "16px solid #eee",
    borderTop: "16px solid #3ae",
    borderRadius: "50%",
    width: "1cm",
    height: "1cm",
    animation: `${spin} 2s linear infinite`
    };
return <div style={styles} />;

.outer1 {
    width:80px;
    height:80px;
    background-color: ;
    border-radius:30%;
    border:10px solid transparent;
    border-left-color:#0074d9;
    border-top-color:#0074d9;
    transform:rotate(-45deg);
}

.inner1 {
    width:0px;
    height:0px;
    border:40px solid transparent;
    border-left-color:#0074d9;
    border-top-color:#0074d9;
}

.outer2 {
    margin-top:-100px;
    width:80px;
    height:80px;
    background-color: ;
    border-radius:30%;
    border:10px solid transparent;
    border-right-color:#34f4d9;
    border-bottom-color:#34f4d9;
    transform:rotate(-45deg);
    z-index:1;
}

.inner2 {
    width:0px;
    height:0px;
    border:40px solid transparent;
    border-right-color:#34f4d9;
    border-bottom-color:#34f4d9;
}

.image {
    position:absolute;
    width:80px;
    height:80px;
    margin-top:-90px;
    margin-left:10px;
}


<div class="spinner"></div>  
<div>
  <div class="outer1">
    <div class="inner1"></div>
  </div>
  <div class="outer2">
    <div class="inner2"></div>
  </div>
  <img src="https://robohash.org/hello?set=set4"
       class="image">
</div>