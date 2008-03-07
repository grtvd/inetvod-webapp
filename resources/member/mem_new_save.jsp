<%@ page import="java.net.URLEncoder"%>
<%@ page import="java.util.HashMap" %>
<%@ page import="com.inetvod.common.core.StrUtil" %>
<%@ page import="com.inetvod.common.data.CategoryID" %>
<%@ page import="com.inetvod.playerClient.rqdata.Category" %>
<%@ page import="com.inetvod.playerClient.rqdata.CategoryList" %>
<%@ page import="com.inetvod.playerClient.rqdata.Provider" %>
<%@ page import="com.inetvod.playerClient.rqdata.ProviderList" %>
<%@ page import="com.inetvod.playerClient.rqdata.RentedShowSearch" %>
<%@ page import="com.inetvod.playerClient.rqdata.RentedShowSearchList" %>
<%@ page import="com.inetvod.playerClient.rqdata.ShowSearch" %>
<%@ page import="com.inetvod.playerClient.rqdata.ShowSearchList" %>
<%@ page import="com.inetvod.webapp.MemRegister" %>
<%@ page import="com.inetvod.webapp.PageMenuMap" %>
<%@ page import="com.inetvod.webapp.ReadXMLFile" %>
<%@ page import="com.inetvod.webapp.player.CategorySearchView" %>
<%@ page import="com.inetvod.webapp.player.NowPlayingView" %>
<%@ page import="com.inetvod.webapp.player.ProviderSearchView" %>
<%@ page import="com.inetvod.webapp.player.SearchResultsView" %>
<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
/**
 * Copyright © 2006-2008 iNetVOD, Inc. All Rights Reserved.
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
		String queryString = "&tbx_Email=" + URLEncoder.encode(request.getParameter("tbx_Email"), "UTF-8");
		queryString = queryString + "&cmb_Question=" + URLEncoder.encode(request.getParameter("cmb_Question"), "UTF-8");
		queryString = queryString + "&tbx_Answer=" + URLEncoder.encode(request.getParameter("tbx_Answer"), "UTF-8");

%>
<!--script type="text/javascript">location.href="error.jsp"</script-->
<script type="text/javascript">location.href = "mem_new.jsp?flag=3<%= queryString%>"</script>
<%
		return;
	}

%>


<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>
<jsp:useBean id="sess" class="com.inetvod.webapp.player.Session" scope="request"/>

<jsp:setProperty name="newMember" property="email_id" value="<%= request.getParameter("tbx_Email") %>"/>
<jsp:setProperty name="newMember" property="password_id" value="<%= request.getParameter("tbx_Password") %>"/>
<jsp:setProperty name="newMember" property="secret_question" value="<%= request.getParameter("cmb_Question") %>"/>
<jsp:setProperty name="newMember" property="secret_answer" value="<%= request.getParameter("tbx_Answer") %>"/>

<%
	newMember.new_Member();
	if(newMember.getError_flag())
	{
		String queryString = "&tbx_Email=" + URLEncoder.encode(request.getParameter("tbx_Email"), "UTF-8");
		queryString = queryString + "&cmb_Question=" + URLEncoder.encode(request.getParameter("cmb_Question"), "UTF-8");
		queryString = queryString + "&tbx_Answer=" + URLEncoder.encode(request.getParameter("tbx_Answer"), "UTF-8");

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

	sess.loadMember(request, response, newMember.getEmail_id(), newMember.getPassword_id(), false);
	if(!sess.hasError())
	{
		Cookie cookie = new Cookie("MemberId", newMember.getMember_id());
		Cookie cookie_page = new Cookie("Page_Redirect", "new");
		response.addCookie(cookie);
		response.addCookie(cookie_page);

%>
<script type="text/javascript">location.href = "mem_personal.jsp"</script>
<%
	}
	else
%>
<script type="text/javascript">location.href = "error.jsp"</script>

