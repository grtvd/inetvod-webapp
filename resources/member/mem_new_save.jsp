<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
	/**
	 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
	 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
	 */
%>

<%

	String c = (String)session.getAttribute(nl.captcha.servlet.Constants.SIMPLE_CAPCHA_SESSION_KEY);
	String parm = request.getParameter("captchafield");
	boolean captcha_flag = false;
	//System.out.println(parm + " ? " + c + ":");

	if(c != null && parm != null)
	{
		captcha_flag = c.equals(parm);
	}

	if(!captcha_flag)
	{
		String queryString = "&tbx_Email=" + request.getParameter("tbx_Email");
		queryString = queryString + "&tbx_Confirm_Email=" + request.getParameter("tbx_Email");
		queryString = queryString + "&cmb_Question=" + request.getParameter("cmb_Question");
		queryString = queryString + "&tbx_Answer=" + request.getParameter("tbx_Answer");

%>
<!--script type="text/javascript">location.href="error.jsp"</script-->
<script type="text/javascript">location.href = "mem_new.jsp?flag=3<%= queryString%>"</script>
<%
		return;
	}

%>


<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>

<jsp:setProperty name="newMember" property="email_id" value="<%= request.getParameter("tbx_Email") %>"/>
<jsp:setProperty name="newMember" property="password_id" value="<%= request.getParameter("tbx_Password") %>"/>
<jsp:setProperty name="newMember" property="secret_question" value="<%= request.getParameter("cmb_Question") %>"/>
<jsp:setProperty name="newMember" property="secret_answer" value="<%= request.getParameter("tbx_Answer") %>"/>

<%
	newMember.new_Member();
	if(newMember.getError_flag())
	{
		String queryString = "&tbx_Email=" + request.getParameter("tbx_Email");
		queryString = queryString + "&cmb_Question=" + request.getParameter("cmb_Question");
		queryString = queryString + "&tbx_Answer=" + request.getParameter("tbx_Answer");

%>
<!--script type="text/javascript">location.href="error.jsp"</script-->
<script type="text/javascript">location.href = "mem_new.jsp?flag=2<%= queryString%>"</script>
<%
		return;
	}

	if(newMember.getEmail_Exist_Flag())
	{
%>
<script type="text/javascript">location.href = "mem_new.jsp?flag=1"</script>
<%
		return;
	}

	Cookie cookie = new Cookie("MemberId", newMember.getMember_id());
	Cookie cookie_page = new Cookie("Page_Redirect", "new");
	//cookie.setMaxAge(365 * 24 * 60 * 60);
	response.addCookie(cookie);
	response.addCookie(cookie_page);

//	response.sendRedirect("mem_personal.jsp");

%>
<script type="text/javascript">location.href = "mem_personal.jsp"</script>


