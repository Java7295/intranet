<%@page import="com.company.intranet.*"%>
<!DOCTYPE html>
<html>
<head>
<title>Company Intranet</title>
<jsp:include page="common/meta.jsp" flush="true" />
<jsp:include page="common/quickedit.jsp" flush="true">
	<jsp:param name="SID" value="Intranet" />
</jsp:include>
</head>

<body onLoad="intranetInit();">

<div id="container">

<header>
<jsp:include page="common/header.jsp" flush="true" />
</header>

<div id="main">

<div id="columnLeft">
<jsp:include page="common/leftColumn.jsp" flush="true">
	<jsp:param name="SID" value="Home" />
</jsp:include>
</div>

<div id="columnCenter">
<jsp:include page="common/headerWelcome.jsp" flush="true" />
<jsp:include page="/portlets/content.jsp" flush="true">
 <jsp:param name="SID" value="Home" />
 <jsp:param name="path" value="links/notification.htm" />
</jsp:include>
<div class="recentNews"><a href="/web/dailyArchive.jsp">Recent news</a></div>
<jsp:include page="/portlets/news.jsp" flush="true">
	<jsp:param name="SID" value="News" />
	<jsp:param name="path" value="Daily/Featured_Story" />
	<jsp:param name="ext" value="asp" />
	<jsp:param name="showMore" value="jsp" />
	<jsp:param name="rotate" value="30" />
</jsp:include>

<jsp:include page="/portlets/content.jsp" flush="true">
	<jsp:param name="SID" value="Home" />
	<jsp:param name="path" value="links/markets.htm" />
</jsp:include>

<jsp:include page="/portlets/content.jsp" flush="true">
	<jsp:param name="SID" value="Home" />
	<jsp:param name="path" value="CEOJournal/CEOJournal.htm" />
</jsp:include>

<jsp:include page="/portlets/content.jsp" flush="true">
	<jsp:param name="SID" value="Home" />
	<jsp:param name="path" value="integrationCentral/integrationCentral.htm" />
</jsp:include>

<jsp:include page="/portlets/content.jsp" flush="true">
	<jsp:param name="SID" value="Home" />
	<jsp:param name="path" value="links_navigations/newOnIntranet.htm" />
</jsp:include>
</div>

<div id="columnRight">
<jsp:include page="common/rightColumn.jsp" flush="true">
	<jsp:param name="searchWidget" value="true" />
	<jsp:param name="travelWidget" value="true" />
	<jsp:param name="performanceWidget" value="true" />
	<jsp:param name="youWidget" value="true" />
	<jsp:param name="mediaWidget" value="true" />
	<jsp:param name="voteWidget" value="true" />
</jsp:include>
</div>

</div> <!-- END main -->

<footer>
<jsp:include page="common/footer.jsp" flush="true" />
</footer>

</div> <!-- END container -->

<div id="shadow"></div>

<script src="js/site.js"></script>

</body>

</html>