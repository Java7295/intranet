var voteRequest = null;
var choice = 1;
var curObjectID = "";
function createVoteRequest()
  {
    try { voteRequest = new XMLHttpRequest(); }
    catch (trymicrosoft) {
      try { voteRequest = new ActiveXObject("Msxml2.XMLHTTP"); }
      catch (othermicrosoft) {
        try { voteRequest = new ActiveXObject("Microsoft.XMLHTTP"); }
        catch (failed) { voteRequest = null; }
      }
    }
  }

function voteAjaxCall(objectid,resultsOnly)
  {
  	curObjectID = objectid;
    createVoteRequest();
    if (resultsOnly)
      { voteRequest.open("GET", "/active/VoteGet?objectid=" + objectid, true); }
    else
      { voteRequest.open("GET", "/active/VoteSet?objectid=" + objectid + "&choice=" + choice, true); }
   	voteRequest.setRequestHeader("If-Modified-Since", "Mon, 26 Jun 2000 12:00:00 GMT");
   	voteRequest.onreadystatechange = showVoteResults;
   	voteRequest.send(null);
  }

function showVoteResults()
  {
    if (voteRequest.readyState == 4 && voteRequest.status == 200)
      {
        rt = voteRequest.responseText;
        while(rt.indexOf("</answer>") > 0)
          {
            answer = rt.substring(rt.indexOf("<answer>") + 8,rt.indexOf("</answer>"));
            rt = rt.substring(rt.indexOf("</answer>") + 9);

            id = answer.substring(answer.indexOf("<id>") + 4,answer.indexOf("</id>"));
            percent = answer.substring(answer.indexOf("<percent>") + 9,answer.indexOf("</percent"));
            barPercent = percent;
            if (percent < 1) barPercent = 1;
            users = answer.substring(answer.indexOf("<users>") + 7,answer.indexOf("</users"));
            idString = curObjectID + id;
            docObj = document.getElementById(idString);
            barColor = "B9CBE3";
            if (id == "2" || id == "4" || id == "6") barColor = "6F98C6";
            if (docObj != null)
              {
                docObj.innerHTML = "<table width=80% cellpadding=0 cellspacing=0 border=0><tr><td style='white-space:nowrap;font-size:10px;'><img src=/images/Portal/vote-" + barColor + ".jpg width=" + barPercent + "% height=10> " + percent + " %</td></tr></table>";
                $(docObj).show("slow");
              }
          }

        meanPct = rt.substring(rt.indexOf("<meanPct>") + 9,rt.indexOf("</meanPct>"));
        idString = "mean" + curObjectID;
        docObj = document.getElementById(idString);
        if (docObj != null)
          {
            docObj.style.width=meanPct+"%";
          }

        userSelected = rt.substring(rt.indexOf("<selected>") + 10,rt.indexOf("</selected>"));
        var mean = rt.substring(rt.indexOf("<mean>") + 6,rt.indexOf("</mean>"));
        var total = rt.substring(rt.indexOf("<total>") + 7,rt.indexOf("</total>"));
        idString = "avg" + curObjectID;
        docObj = document.getElementById(idString);
        if (docObj != null)
          {
            docObj.innerHTML = "You voted: " + userSelected + ", Average: " + mean + ", Total: " + total;
          }
      }
  }