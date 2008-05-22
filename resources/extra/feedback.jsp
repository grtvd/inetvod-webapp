<%--
Copyright © 2008 iNetVOD, Inc. All Rights Reserved.
iNetVOD Confidential and Proprietary.  See LEGAL.txt.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<jsp:include flush="true" page="../player/header.jsp"/>

	<script type="text/javascript">
		function onSubmit()
		{
			var oFeedbackMsg = document.getElementById("Feedback_Msg");
			var oFeedbackErr = document.getElementById("Feedback_Err");
			var oSubjectErr = document.getElementById("Feedback_Subject_Err");
			var oBodyErr = document.getElementById("Feedback_Body_Err");

			oFeedbackMsg.innerHTML = "";
			oFeedbackErr.innerHTML = "";
			oSubjectErr.innerHTML = "";
			oBodyErr.innerHTML = "";

			var oEdit = document.getElementById("Feedback_Subject");
			var subject = trim(oEdit.value);
			if(!testStrHasLen(subject))
			{
				oSubjectErr.innerHTML = "Please enter a Subject";
				oEdit.focus();
				return false;
			}

			oEdit = document.getElementById("Feedback_Body");
			var body = trim(oEdit.value);
			if(!testStrHasLen(body))
			{
				oBodyErr.innerHTML = "Please enter a Message";
				oEdit.focus();
				return false;
			}

			document.getElementById("Feedback_Submit").disabled = true;
			oFeedbackMsg.innerHTML = "Processing, please wait...";
			ExtraAPI.newInstance().sendFeedback(subject, body, onSubmitCallback);
			return false;
		}

		function onSubmitCallback(xmlHttp)
		{
			var oFeedbackMsg = document.getElementById("Feedback_Msg");
			var oFeedbackErr = document.getElementById("Feedback_Err");

			document.getElementById("Feedback_Submit").disabled = false;
			oFeedbackMsg.innerHTML = "";
			oFeedbackErr.innerHTML = "";

			var result = xmlHttp.responseText;
			if (result == ExtraAPI.SUCCESS_RESULT)
			{
				var msg = "Thank you, your feedback has been received."
				oFeedbackMsg.innerHTML = msg;
				alert(msg);
			}
			else
				oFeedbackErr.innerHTML = "Sorry, there was an error processing your request. Please try again later."
		}
	</script>

	<div style="padding:2em;">

		<h3>Feedback</h3>

		<p>Have an idea for improving Storm? Just don't get something? We'd love to hear from you.</p>

		<table>
			<tr>
				<td>Subject:</td>
				<td><input id="Feedback_Subject" class="editCtr" size="40" maxlength="128"/></td>
			</tr>
			<tr>
				<td/>
				<td><span id="Feedback_Subject_Err" class="required"></span></td>
			</tr>
			<tr>
				<td valign="top">Message:</td>
				<td><textarea id="Feedback_Body" rows="6" cols="43"></textarea></td>
			</tr>
			<tr>
				<td/>
				<td><span id="Feedback_Body_Err" class="required"></span></td>
			</tr>
			<tr>
				<td/>
				<td><input id="Feedback_Submit" type="submit" value="Send" onclick="return onSubmit()"/></td>
			</tr>
			<tr>
				<td/>
				<td><span id="Feedback_Msg"></span><span id="Feedback_Err" class="required"></span></td>
			</tr>
		</table>

	</div>

<jsp:include flush="true" page="../player/footer.jsp"/>
