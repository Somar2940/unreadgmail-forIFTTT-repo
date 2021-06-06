function myFunction() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  var searchCondition = `is:unread after:${Utilities.formatDate(date,'JST','yyyy/M/d')}`;
  Logger.log(Utilities.formatDate(date,'JST','yyyy/M/d'));
  var threads = GmailApp.search(searchCondition);
  var count = 0;
  for (var i = 0 ; i < threads.length; i++) {
    var msgs = GmailApp.getMessagesForThread(threads[i]);
    for (var j = 0; j < msgs.length; j++) {
      Logger.log(msgs[j].getSubject());
      count += 1;
    }
  }
  Logger.log(String(count));
}