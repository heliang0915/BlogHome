export default {
  getChannelName(channelId,allChannels) {
    let channelName = "";
    for (var channel of allChannels) {
      if (channelId == 0) {
        break;
      }
      if (channelId && channel.uuid == channelId) {
        channelName = channel.name;
      }
    }
    return channelName;
  }
}
