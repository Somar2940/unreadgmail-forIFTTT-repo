// IFTTTにWebHookをPOSTする
function sendIFTTTWebHook(endpoint, value1, value2) {
  var webhook_key = getwhkey(); //グローバル関数　webhookの鍵を取得 
  var message = {
    "value1":value1,
    "value2":value2
  };
  var options = {
    "method":"POST",
    "headers": {
      "Content-Type":"application/json"
    },
    "payload":JSON.stringify(message)
  };
  UrlFetchApp.fetch("https://maker.ifttt.com/trigger/" + endpoint + "/with/key/" + webhook_key, options)
}

//未読メール数取得
function getUnreadGmailCount(){
  const date = new Date();
  date.setDate(date.getDate() - 1);
  var searchCondition = `in:inbox is:unread after:${Utilities.formatDate(date,'JST','yyyy/M/d')}`;
  var threads = GmailApp.search(searchCondition);
  var count = 0;
  for (var i = 0 ; i < threads.length; i++) {
    var msgs = GmailApp.getMessagesForThread(threads[i]);
    for (var j = 0; j < msgs.length; j++) {
      count += 1;
    }
  }
  return count;
}

function main() {
  var mailAddress = Session.getActiveUser().getUserLoginId();
  Logger.log(mailAddress);
  user = account_list(mailAddress); //グローバル関数 Individual,School,Workのいずれかが戻り値
  unreadCount = getUnreadGmailCount();
  if (unreadCount > 0){
    sendIFTTTWebHook("unread_gmail", user, String(unreadCount) + "件");
  }
}
