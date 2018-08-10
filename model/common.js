$(document).ready(function(){
    var flag = false;
    $("#searckBtn").click(function(){
        if(!flag){
            $("#headbar").append("<li id=searchinput><from action=# ><input type=tex name=searchkey class=searck_input></form></li>");
        }else{
            $("#searchinput").remove();
        }
        flag = !flag;
    });
    $("#login_btn").click(function(){
        var userEmail = $("#userEmail").val();
        var userPwd = $("#userPwd").val();
        if(userEmail==null||userEmail.trim()==''||userPwd==null||userPwd.trim()==''){
            $("#error").text('邮箱或密码不能为空！');
            return;
        }else if(userPwd!=null&&(userPwd.length<6||userPwd.length>40)){
            $("#error").text('您输入的密码不符合要求，密码长度为6-40！');
            return;
        }
        $("#login_form").submit();
    });
    $("#regist_btn").click(function(){
        var userName = $("#userName").val();
        var userEmail = $("#userEmail").val();
        var userPwd = $("#userPwd").val();
        var userRepwd = $("#userRepwd").val();
        if(userName==null||userName.trim()==''){
            $("#error").text('用户名不能为空！');
            return;
        }else if(userEmail==null||userEmail.trim()==''){
            $("#error").text('邮箱不能为空！');
            return;
        }else if(userPwd==null||userPwd.trim()==''){
            $("#error").text('密码不能为空！');
            return;
        }else if(userRepwd==null||userRepwd.trim()==''){
            $("#error").text('请确认密码！');
            return;
        }else if(userPwd!=null&&(userPwd.length<6||userPwd.length>40)){
            $("#error").text('您输入的密码不符合要求，密码长度为6-40！');
            return;
        }
        $("#regist_form").submit();
    });

});