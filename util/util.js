export default {
  getChannelName(channelId, allChannels) {
    let channelName = "";
    if (allChannels) {
      if (allChannels.length) {
        for (var channel of allChannels) {
          if (channelId == 0) {
            break;
          }
          if (channelId && channel.uuid == channelId) {
            channelName = channel.name;
          }
        }
      }
    }
    return channelName;
  }
}
