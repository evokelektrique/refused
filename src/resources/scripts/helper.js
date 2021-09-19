export class Helper {
  /**
   * Parse and validate given URL
   * @param  {string} url hostname
   * @return {object}     hostname on success or error
  */
  static parse_url(url) {
    let _url
    let domain

    try {
      _url   = new URL(url)
      domain = _url.hostname.replace(/^[^.]+\./g, '');
    } catch(error) {
      _url   = null
      domain = null
    }

    return {
      status: (_url ? true : false),
      url: _url.hostname,
      domain: domain
    }
  }
}
