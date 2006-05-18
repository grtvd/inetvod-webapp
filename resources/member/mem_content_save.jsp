<%@ page contentType="text/html; charset=iso-8859-1" language="java" %>
<%
	/**
	 * Copyright © 2006 iNetVOD, Inc. All Rights Reserved.
	 * iNetVOD Confidential and Proprietary.  See LEGAL.txt.
	 */
%>
<jsp:include flush="true" page="cookie_check.jsp"/>
<jsp:useBean id="newMember" class="com.inetvod.webapp.MemRegister" scope="request"/>

<%
	String str_Download = request.getParameter("cbx_Content_Download") == null ? ""
		: request.getParameter("cbx_Content_Download");
	String str_Streaming = request.getParameter("cbx_Content_Streaming") == null ? ""
		: request.getParameter("cbx_Content_Streaming");
	String str_Speed = request.getParameter("cmb_Speed") == null ? "" : request.getParameter("cmb_Speed");
%>
<jsp:setProperty name="newMember" property="download" value="<%= "1".equals(str_Download) %>"/>
<jsp:setProperty name="newMember" property="streaming" value="<%= "1".equals(str_Streaming) %>"/>
<jsp:setProperty name="newMember" property="speed" value="<%= str_Speed %>"/>

<%
	newMember.member_Content_Update(newMember.getMember_id());
	if(newMember.getError_flag())
	{
		String queryString = "&cbx_Content_Download=" + str_Download;
		queryString = queryString + "&cbx_Content_Streaming=" + str_Streaming;
		queryString = queryString + "&cmb_Speed=" + str_Speed;
%>
<!--script type="text/javascript">location.href="error.jsp"</script-->
<script type="text/javascript">location.href = "mem_content.jsp?flag=2<%= queryString%>"</script>
<%
	}

	String redirect_Page = newMember.getPage_Redirect();
	if("new".equals(redirect_Page))
	{
%>
<script type="text/javascript">location.href = "mem_logon_update.jsp"</script>
<%
	}
%>
<script type="text/javascript">location.href = "cookie_exist_user.jsp"</script>


