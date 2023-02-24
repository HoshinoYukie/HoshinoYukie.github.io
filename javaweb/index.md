## JSP

1. JSP 基本元素

   + JSP 动作元素

     以 `jsp` 为前缀

   + JSP 脚本元素

     `<%@ 指令名 属性1=“属性值1” ……%>`

     + page 指令：定义网页的全局属性，仅 import 可使用多次
     + include 指令：将其他文件插入JSP网页
     + taglib 指令

   + JSP 基本元素

     + `<%! %>` JSP声明

     + `<%= %>` 表达式

   + include 指令 与 include 动作

     **include 动作** 是动态包含，可以传递参数

2. JSP 内置对象

   预先定义的对象，便于数据的保存，传输和获取

   + request

     接收浏览器提交的数据

   + response

     响应客户端的请求，并向客户端输出信息

   + page

   + session

   + application

3. 实现页面跳转

   +  `<jsp:forward page=""/>` 

   +  ```java
      //获取请求转发对象
      RequestDispatcher dispatcher = request.getRequestDispatcher("/index.jsp");
      //执行转发
      dispatcher.forward(request,response);
      ```

   + ```java
     response.sendRedirect("/index.jsp");
     ```

4. session

   + 作用：访问用户数据，记录客户的连接信息
   + 生命周期：打开网页访问 JSP 网页到关闭浏览器或被销毁
   + 有效期：15分钟

5. session 与 application

   + application 生命周期：从服务器开启到服务器结束

6. 服务器端运行环境 先安装 JDK 再安装 Tomcat

7. 

##  JavaBean 技术

1. JSP中引入 JavaBean 的优点。

   1. 减少重复代码，使代码更加简洁；

   2. 实现数据的封装和隐藏，提高安全性和可读性；
   3. 实现组件的复用和交互，提高开发效率和灵活性；

2. JavaBean 按功能分为几类。
   1. Session Bean：会话构建，临时对象
   2. Entity Bean：实体构建，长期对象
   3. MessageDriven Bean：消息驱动构建，异步对象

3. JavaBean 规范。
   1. JavaBean 是一个公共类；
   2. JavaBean 类具有一个无参的构造方法；
   3. JavaBean 的所有属性定义为私有；
   4. 在JavaBean 中需要对所有属性提供两个公共方法`setXXX()`与 `getXXX()`；

4. 动作标记`useBean` ,`getProperty` ,`setProperty` 的作用，及其各属性的作用。在使用时需注意哪些问题。
   在使用之前需要先导入包`<%@ page contentType="text/html" import="包名" pageEncode="UTF-8"%>` 

   1. useBean：声明JavaBean对象

      ````jsp
      <jsp:useBean id="对象名" class="classname" scope=""/>
      ````

      scope 范围：page,request,session,application

   2. getProperty: 获取JavaBean对象中的值 
   
      ````JSP
      <jsp:getProperty name="对象名" property="属性名"/>
      ````

   3. setProperty: 设置JavaBean对象值 
   
      ```jsp
      <jsp:setProperty name="对象名" property="属性名" value="属性值"/>
      ```

      或 
   
      ```jsp
      <jsp:setProperty name="对象名" property="属性名" param="变量名"/>
      ```
   
      ` 。有时可写为` 
   
      `````jsp
      <jsp:setProperty name="对象名" property="*">
      `````
   
      表示将表单输入域中的值放到 JavaBean 对象中相同名称的属性中。

## Servlet

1. Servlet 的建立

   `项目工程名/WEB-INF` 目录下创建配置文件 `web.xml` 

   Servlet 创建时设置映射地址，路径首字符必须是 "/" 。

2. JSP 与 Servlet 技术之间的关系。

   Servlet 是用 Java 语言编写的服务器端程序，可以处理客户端传来的 HTTP 请求，并返回一个响应

3. Servlet类的父类？它是在服务端创建对象吗？

   父类是HttpServlet。在服务器端创建对象。

4. 假设 Rain 是 Tomcat 服务器（端口号为8080）的一个 Web 服务目录，其虚拟目录为 south 。 Hello.jsp 保存在 Rain 的子目录 sea 中，则访问 Hello.jsp 的正确网络路径为 `http://127.0.0.1/south/sea/Hello.jsp` 

5. 

##  MVC 

1. MVC 模式结构总共有几层，各层的作用是什么？在JSP中，各层由什么组件来完成这些功能。

   共有三层

   1. 视图层 View JSP 实现页面的样式显示
   2. 模型层 Model JavaBean 实现业务逻辑的处理
   3. 控制层 Control Servlet 实现任务的执行

2. JSP 中有哪些模式？

   - **指令模式**：用于设置JSP页面的属性，如编码、导入类、错误处理等。指令模式以 `<%@` 和 `%>` 为标签。
   - **脚本模式**：用于在JSP页面中嵌入Java代码，如变量声明、表达式、控制语句等。脚本模式有三种标签： `<%!` ， `<%` 和 `<%=` 。
   - **声明模式**：用于在JSP页面中定义自定义标签，如HTML标签、XML元素等。声明模式以 `<` 和 `/>` 为标签。

3. 如何创建request、session生命周期的模型。使用request生命周期的模型，若要转发request对象，则必须要使用哪种方式进行页面的跳转？

   + 转向与重定向

     转向时 request 对象中的信息不丢失 

     ```java
     RequestDispatcher rd=request.getRequestDispatcher("jsp网页")
     rd.forward(request,response)
     ```

     重定向 

     ```java
     response.sendRedirect("jsp网页地址")
     ```

   + request 

     1. 数据的获取 `request.getParameter("参数变量名")`
     2. 数据的形成和保存 `request.setParameter("属性名",对象类型的属性值)`  
     3. 数据的删除 `request.removeAttribute("属性名")` 

   + session

     需要先获取 HttpSession 的实例对象

     1. 数据的获取 `session.getAttribute("参数变量名")`

     2. 数据的形成和保存 `session.setAttribute("属性名",对象类型的属性值)`  

     3. 数据的删除 `session.removeAttribute("属性名")` 

        

