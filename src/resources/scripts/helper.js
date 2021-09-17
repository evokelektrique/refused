export class Helper {
  /**
   * Parse and validate given URL
   * @param  {string} url hostname
   * @return {object}     hostname on success or error
  */
  static parse_url(url) {
    let _url;
    try {
      _url = new URL(url)
    } catch(error) {
      _url = null
    }

    return {
      status: (_url ? true : false),
      url: _url.host
    }
  }
}