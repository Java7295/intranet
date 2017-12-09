<%@ page import="java.io.*,com.company.intranet.*,com.company.intranet.NewsServices.*,java.util.Calendar,java.text.SimpleDateFormat,java.io.BufferedReader,java.util.*,java.sql.Connection"%>
<%UserRoles userRoles = new UserRoles(request);
String[] roles = userRoles.getUserRole();
MobileCheck mobileCheck = new MobileCheck();

String byCommunity = request.getParameter("byCommunity");
String companyData = request.getParameter("companyData");
String inSID = request.getParameter("SID");
if (inSID == null) inSID = "";
String inPath = request.getParameter("path");
String show404 = request.getParameter("show404");
String showMore = request.getParameter("showMore");
String prevLink = request.getParameter("prevLink");
String nextLink = request.getParameter("nextLink");
String rotate = request.getParameter("rotate");
String appendJS = request.getParameter("appendJS");
String SSD = request.getParameter("SSD");
String commentCount = request.getParameter("commentCount");
if (commentCount == null) commentCount = "";
String recommendCount = request.getParameter("recommendCount");
if (recommendCount == null) recommendCount = "";

if (rotate == null) rotate = "";

if (inPath == null) inPath = "";
if (inPath.length() > 0 && inPath.charAt(0) == '/') inPath = inPath.substring(1);

String URL = "/content.jsp?SID=" + inSID + "&path=" + inPath;
String galleryURL = "/portlets/content.jsp?SID=" + inSID + "&path=" + inPath.substring(0,inPath.lastIndexOf(".")) + ".php";
if (showMore != null && showMore.length() > 2) URL = URL.substring(0,URL.lastIndexOf(".")) + "." + showMore;
if (!mobileCheck.checkFullSite(request) || commentCount.equalsIgnoreCase("mobile")) URL = "/mobile/jsp/mobileArticle.jsp?SID=" + inSID + "&path=" + inPath.substring(0,inPath.lastIndexOf(".")) + ".php3";

String email = request.getHeader("x-mail");
if (email == null) email = "";

String fullname = request.getHeader("x-fullname");
if (fullname == null) fullname = "";

String filePath = userRoles.getDataDirectory() + "/documentum/" + inSID + "/" + inPath;
if (byCommunity != null && byCommunity.equalsIgnoreCase("true")) filePath += "/" + roles[1] + ".htm";
if (companyData != null && companyData.equalsIgnoreCase("true")) filePath = "/data/company/" + inPath;

long outDate = 0;
SimpleDateFormat dataformat = new SimpleDateFormat("MMMMM dd, yyyy h:mm aaa");
SimpleDateFormat googleformat = new SimpleDateFormat("yyyy-M-d");

if (inPath.length() > 0 && 
		(inPath.toLowerCase().indexOf(".jpg") > 0 
		|| inPath.toLowerCase().indexOf(".gif") > 0 
		|| inPath.toLowerCase().indexOf(".png") > 0)) { 
  if (inPath.length() > 0 &&
		(inPath.toLowerCase().indexOf(".pdf") > -1
		|| inPath.toLowerCase().indexOf(".doc") > -1
		|| inPath.toLowerCase().indexOf(".dot") > -1
		|| inPath.toLowerCase().indexOf(".ppt") > -1
		|| inPath.toLowerCase().indexOf(".pps") > -1
		|| inPath.toLowerCase().indexOf(".xls") > -1
		|| inPath.toLowerCase().indexOf(".xml") > -1
		|| inPath.toLowerCase().indexOf(".zip") > -1
		|| inPath.toLowerCase().indexOf(".mpp") > -1
		|| inPath.toLowerCase().indexOf(".vsd") > -1
		|| inPath.toLowerCase().indexOf(".xlt") > -1
		|| inPath.toLowerCase().indexOf(".wmv") > -1
		|| inPath.toLowerCase().indexOf(".avi") > -1
		)) {  %>
		<jsp:include page="attachment.jsp" flush="true">
     		<jsp:param name="SID" value="<%=inSID%>" />
			<jsp:param name="path" value="<%=inPath%>" />
		</jsp:include>
<% } 
else try {
	File file = new File(filePath);
	outDate = file.lastModified();
	String lastModified = dataformat.format(outDate);

	int sinceMin = (int)(Calendar.getInstance().getTimeInMillis()-outDate)/1000/60;

	String sinceModified = "";
	if (sinceMin < 0) sinceModified = "";
	else if (sinceMin == 0) sinceModified = "Updated less than a minute ago";
	else if (sinceMin < 60) sinceModified = "Updated " + sinceMin + " minutes ago";
	else if (sinceMin < 120) sinceModified = "Updated an hour ago";
	else if (sinceMin < 180) sinceModified = "Updated 2 hours ago";
	else if (sinceMin < 240) sinceModified = "Updated 3 hours ago";
	else if (Calendar.getInstance().get(Calendar.HOUR_OF_DAY) - (sinceMin / 60) > 0) sinceModified = "Updated earlier today";

	if (appendJS != null && appendJS.equalsIgnoreCase("true")) {
		String outSID = userRoles.getCommunityName(inSID);
	%><script type="text/javascript">googleDate='<%=googleformat.format(outDate)%>';lastModified='<%=dataformat.format(outDate)%>';sinceModified='<%=sinceModified%>';inSID='<%=inSID%>';outSID='<%=outSID%>';inPath='<%=inPath%>';</script><% }

	boolean permOK = true;
	if (inPath.indexOf("_private/") > -1 && !(userRoles.getCommunityName(inSID).equalsIgnoreCase(userRoles.getPreferredCommunity()))){
				permOK = false;
	}
	else if (inPath.indexOf("_intranet/") > -1 && userRoles.getInternet()) permOK = false;

	if (permOK) {
	if (!file.exists()) throw new FileNotFoundException();
	ValidateLink vl = new ValidateLink();
	SSDPerf ssdData = new SSDPerf();
	FileInputStream fis = new FileInputStream(file);
	BufferedInputStream bis = new BufferedInputStream(fis);
	BufferedReader br = new BufferedReader(new InputStreamReader(bis));
	String processedLine = null;
	StockGet stockGet = new StockGet();
	String stockPrice = stockGet.getStockPrice("Company");
	String stockUpDown = stockGet.getStockUpDown("Company");
	String dowPrice = stockGet.getStockPrice("^DJI");
	String dowUpDown = stockGet.getStockUpDown("^DJI");
	String sp500Price = stockGet.getStockPrice("^GSPC");
	String sp500UpDown = stockGet.getStockUpDown("^GSPC");
	String intranetFlag = userRoles.getInternet()? "Internet":"intranet";
	String dateOfBirth = userRoles.getFormattedDateOfBirth();
	String homeZip = userRoles.gethomeZipCode();

	String logoffStr = "/AGLogout";
	if (userRoles.getContainer().indexOf("companyActive") > -1) {
		String devQA = "";
		String PSDevQA = "prd";
		if (request.getServerName().indexOf(".stage") > -1 || request.getServerName().indexOf("-amstage") > -1) { devQA = "-amstage"; PSDevQA = "stg"; }
		if (request.getServerName().indexOf(".ichain") > -1 || request.getServerName().indexOf("-amdev") > -1) { devQA = "-amdev"; PSDevQA = "dev"; }
		logoffStr = "https://peoplesoft" + devQA + ".company.com/psp/" + PSDevQA + "/EMPLOYEE/HRMS/?cmd=logout";
	}
	
	String toolsArray = "";
	if (inPath.indexOf("tool") > -1) {
		DBUtility dbutility = new DBUtility();
		ArrayList<?> favoritesList = dbutility.getMyFavorites(roles[0],"MY_TOOLS");
		if (favoritesList.size() > 0) {
			for (int i = 0; i < favoritesList.size(); i++) {
				FavoritesInfo info = (FavoritesInfo) favoritesList.get(i);
				if (i > 0) toolsArray += ",";
				toolsArray += "'" + info.getObjectID() + "'";
			}
		}
	}

	String outComments = "";
	if (commentCount != null && (commentCount.equalsIgnoreCase("true")) || (commentCount.equalsIgnoreCase("mobile")) ) {
		DBUtility dbutility = new DBUtility();
		Connection conn = dbutility.getConnection();
		CommentAll commentAll = new CommentAll();
		int comCount = commentAll.getContentCount(conn, file.getName());
		dbutility.closeConnection(conn);
		outComments = Integer.toString(comCount);
	}
	String outRecommends = "";
	String articleID = inPath.substring(inPath.lastIndexOf("/")+1,inPath.lastIndexOf(".")) + ".txt";
	String recommendURL = "/NewsRecommend?articleID=" + articleID + "&SID=" + inSID + "&path=" + inPath;
	String recommendOn = "off";
	if (recommendCount != null && recommendCount.equalsIgnoreCase("true")) {
		DBUtility dbutility = new DBUtility();
		Connection conn = dbutility.getConnection();
		NewsRecommend newsRecommend = new NewsRecommend();
		int recCount = newsRecommend.getRecommends(conn, articleID);
		outRecommends = Integer.toString(recCount);
		String recUser = userRoles.getFileNumber();
		if (newsRecommend.checkRecommend(conn, articleID,recUser)) {
			recommendOn = "on";
			recommendURL += "&recommend=no";
		}
		else
			recommendURL += "&recommend=yes";
		dbutility.closeConnection(conn);
	}

	Map<String,String> SSDmap = new HashMap<String,String>();
	Map<String,String> formMap = new HashMap<String,String>();
	if (SSD != null && SSD.equalsIgnoreCase("true")) {
		SSDmap = ssdData.getSSDdata();
	}
	while ((processedLine = br.readLine()) != null )
		{
			if (processedLine.indexOf("[[") > -1)
				{
					processedLine = processedLine.replaceAll("\\[\\[Name\\]\\]",fullname);
					processedLine = processedLine.replaceAll("\\[\\[Mail\\]\\]",email);
					processedLine = processedLine.replaceAll("\\[\\[URL\\]\\]",URL);
					processedLine = processedLine.replaceAll("\\[\\[galleryURL\\]\\]",galleryURL);
					processedLine = processedLine.replaceAll("\\[\\[LastModified\\]\\]",lastModified);
					processedLine = processedLine.replaceAll("\\[\\[DateOfBirth\\]\\]",dateOfBirth);
					processedLine = processedLine.replaceAll("\\[\\[HomeZipCode\\]\\]",homeZip);
					processedLine = processedLine.replaceAll("\\[\\[SinceModified\\]\\]",sinceModified);
					processedLine = processedLine.replaceAll("\\[\\[intranet\\]\\]", intranetFlag);
					processedLine = processedLine.replaceAll("\\[\\[addressCode\\]\\]", userRoles.getCompanyAddrCode());
					processedLine = processedLine.replaceAll("\\[\\[EmployeeGroup\\]\\]", userRoles.getEmplGroup());
					processedLine = processedLine.replaceAll("\\[\\[JobCode\\]\\]", userRoles.getJobCode());
					processedLine = processedLine.replaceAll("\\[\\[Rotate\\]\\]",rotate);
					processedLine = processedLine.replaceAll("\\[\\[journalPrev\\]\\]",prevLink);
					processedLine = processedLine.replaceAll("\\[\\[journalNext\\]\\]",nextLink);
					processedLine = processedLine.replaceAll("\\[\\[Company\\]\\]",stockPrice);
					processedLine = processedLine.replaceAll("\\[\\[CompanyARROW\\]\\]",stockUpDown);
					processedLine = processedLine.replaceAll("\\[\\[DOW\\]\\]",dowPrice);
					processedLine = processedLine.replaceAll("\\[\\[DOWARROW\\]\\]",dowUpDown);
					processedLine = processedLine.replaceAll("\\[\\[SP500\\]\\]",sp500Price);
					processedLine = processedLine.replaceAll("\\[\\[SP500ARROW\\]\\]",sp500UpDown);
					processedLine = processedLine.replaceAll("\\[\\[COMMENTS\\]\\]",outComments);
					processedLine = processedLine.replaceAll("\\[\\[Recommends\\]\\]",outRecommends);
					processedLine = processedLine.replaceAll("\\[\\[RecommendURL\\]\\]",recommendURL);
					processedLine = processedLine.replaceAll("\\[\\[Recommended\\]\\]",recommendOn);
					processedLine = processedLine.replaceAll("\\[\\[Logoff\\]\\]",logoffStr);
					processedLine = processedLine.replaceAll("\\[\\[toolsArray\\]\\]",toolsArray);
					if (processedLine.indexOf("[[MyDepartment]]")>-1)
						processedLine = processedLine.replaceAll("\\[\\[MyDepartment\\]\\]",userRoles.getPreferredCommunity());
					if (processedLine.indexOf("[[MostRecommended")>-1){
						NewsRecommend newsRecommend = new NewsRecommend();
						String[] recommends = newsRecommend.getMostRecommendedArticle(request, inSID).split(";");
						processedLine = processedLine.replaceAll("\\[\\[MostRecommendedDate\\]\\]",recommends[0]);
						processedLine = processedLine.replaceAll("\\[\\[MostRecommendedPath\\]\\]",recommends[1]);
						processedLine = processedLine.replaceAll("\\[\\[MostRecommendedTitle\\]\\]",recommends[2]);
						processedLine = processedLine.replaceAll("\\[\\[MostRecommendedCount\\]\\]",recommends[3]);
					}
					if (processedLine.indexOf("[[MostCommented")>-1){
						NewsComment newsComment = new NewsComment();
						String[] comments = newsComment.getMostCommentedArticle(request, inSID).split(";");
						processedLine = processedLine.replaceAll("\\[\\[MostCommentedDate\\]\\]",comments[0]);
						processedLine = processedLine.replaceAll("\\[\\[MostCommentedPath\\]\\]",comments[1]);
						processedLine = processedLine.replaceAll("\\[\\[MostCommentedTitle\\]\\]",comments[2]);
						processedLine = processedLine.replaceAll("\\[\\[MostCommentedCount\\]\\]",comments[3]);
					}
					if (SSD != null && SSD.equalsIgnoreCase("true")){
						for (Map.Entry<String,String> entry : SSDmap.entrySet())
							processedLine = processedLine.replaceAll(entry.getKey(),entry.getValue());

						if (processedLine.indexOf("[[form-")>-1) {
							FormData formData = new FormData();
							formMap = formData.getFormData(request,processedLine);
							for (Map.Entry<String,String> entry : formMap.entrySet())
								processedLine = processedLine.replaceAll(entry.getKey(),entry.getValue());
							SSDmap.putAll(formMap);
						}

						if (processedLine.indexOf("[[SAT-")>-1)
							processedLine = ssdData.switchCustSatElements(processedLine);
					}
				}
			if (processedLine.indexOf("[[AAM-") > -1) processedLine = vl.getAAMLink(request, processedLine);
			if (processedLine.indexOf("href=") > -1 || processedLine.indexOf("src") > -1)
				processedLine = vl.getApprovedLink(roles, processedLine);
			%><%=processedLine%>
<%
		}
	bis.close();
	fis.close();
	} // permOK
} catch (FileNotFoundException fnf) {
	SimpleDateFormat logformat = new SimpleDateFormat(
	"MMM d, yyyy h:mm:ss aaa zzz");

userRoles.logContent("<" + logformat.format(Calendar.getInstance().getTime())
	+ "> <Notice> <" + roles[0] + "> <Content missing: " + filePath + ">");
	if (show404 != null && show404.equalsIgnoreCase("true")) { %>
	<jsp:include page="404.jsp" flush="true">
		<jsp:param name="SID" value="<%=inSID%>" />
		<jsp:param name="path" value="<%=inPath%>" />
	</jsp:include>
	<% }
} catch (Exception e) {}
%>
