import XHRBackend from 'i18next-xhr-backend';
import axios from 'axios';

export default class extends XHRBackend {
  constructor(services, opts) {
    super(
      services,
      Object.assign(
        {
          ajax: (url, { init } = {}, cb) => axios(url, Object.assign({
            transformResponse: undefined, // i18next expects JSON, not an object
          }, init)).then(
            res => cb(res.data, res),
            err => cb('', err),
          ),
        },
        opts,
      ),
    );
  }
}
