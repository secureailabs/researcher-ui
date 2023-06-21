import papaparse from 'papaparse';
import { SeriesDataModelSchema } from 'src/client';
import { TDataFrameDataModel } from './components/UploadItem/UploadItem';

class ValidatorCsv {
  public validate_headers(
    data_model: TDataFrameDataModel,
    list_series_name_data: string[],
    addLogMessage: (message: string) => void
  ): boolean {
    let allGood = true;
    const list_series_data_model = data_model.list_series_data_model;
    const list_series_name_model = list_series_data_model.map(
      (series_data_model) => {
        return series_data_model.series_name;
      }
    );
    const data_frame_name = data_model.data_frame_name;

    for (const series_name of list_series_name_model) {
      if (!list_series_name_data.includes(series_name)) {
        allGood = allGood && false;
        addLogMessage(
          `In data frame with name "${data_frame_name}" series with name "${series_name}" specified in model but not present in data frame`
        );
      }
    }

    for (const series_name of list_series_name_data) {
      if (!list_series_name_model.includes(series_name)) {
        allGood = allGood && false;
        addLogMessage(
          `In data frame with name "${data_frame_name}" series with name "${series_name}" present in data frame but not specified in model`
        );
      }
    }

    return allGood;
  }

  public validate_data_row(
    row_data: any,
    data_frame_data_model: TDataFrameDataModel,
    addLogMessage: (message: string) => void
  ): boolean {
    // TODO: validate that patient id and dataset id series are present?
    let allGood = true;
    let i = 0;
    let index = '';
    for (const key in row_data) {
      if (i === 0) {
        index = row_data[key];
        i++;
        break;
      }
      const value = row_data[key];
      const series_data_model = data_frame_data_model.list_series_data_model[i];
      allGood =
        allGood &&
        this.validate_data_value(
          index,
          value,
          data_frame_data_model.data_frame_name,
          series_data_model,
          addLogMessage
        );
      i++;
    }
    return allGood;
  }

  // methods
  private _get_problem_prefix(
    name_data_frame: string,
    series_name: string,
    index: string
  ): string {
    return `In data frame with name "${name_data_frame}" in series with name "${series_name}" at index "${index}"`;
  }

  public validate_data_value(
    index: string,
    value: string,
    name_data_frame: string,
    series_data_model: SeriesDataModelSchema,
    addLogMessage: (message: string) => void
  ): boolean {
    if (series_data_model.type === 'SeriesDataModelCategorical') {
      return this.validate_data_element_categorical(
        index,
        value,
        name_data_frame,
        series_data_model,
        addLogMessage
      );
    } else if (series_data_model.type === 'SeriesDataModelDate') {
      return this.validate_data_element_date(
        index,
        value,
        name_data_frame,
        series_data_model,
        addLogMessage
      );
    } else if (series_data_model.type === 'SeriesDataModelDateTime') {
      return this.validate_data_element_date_time(
        index,
        value,
        name_data_frame,
        series_data_model,
        addLogMessage
      );
    } else if (series_data_model.type === 'SeriesDataModelInterval') {
      return this.validate_data_element_interval(
        index,
        value,
        name_data_frame,
        series_data_model,
        addLogMessage
      );
    } else if (series_data_model.type === 'SeriesDataModelRatio') {
      return this.validate_data_element_ratio(
        index,
        value,
        name_data_frame,
        series_data_model,
        addLogMessage
      );
    } else if (series_data_model.type === 'SeriesDataModelUnique') {
      return this.validate_data_element_unique(
        index,
        value,
        name_data_frame,
        series_data_model,
        addLogMessage
      );
    } else {
      throw new Error(
        `Unknown series data model type ${series_data_model.type}`
      );
    }
  }

  public validate_data_element_categorical(
    index: string,
    value: string,
    data_frame_name: string,
    series_data_model: SeriesDataModelSchema,
    addLogMessage: (message: string) => void
  ): boolean {
    const problem_prefix = this._get_problem_prefix(
      data_frame_name,
      series_data_model.series_name,
      index
    );
    // check that the value is string or ""
    // check that every value is out of the list of values or None
    if (value === '') {
      addLogMessage(`${problem_prefix} value is empty`);
      return false;
    } else if (!series_data_model.list_value?.includes(value)) {
      addLogMessage(
        `${problem_prefix} value "${value}" is not in list of allowed values ${series_data_model.list_value}`
      );
      return false;
    }
    return true;
  }

  public validate_data_element_date(
    index: string,
    value: string,
    data_frame_name: string,
    series_data_model: SeriesDataModelSchema,
    addLogMessage: (message: string) => void
  ): boolean {
    // follows "YYYY-MM-DD" https://microformats.org/wiki/datetime-design-pattern
    const problem_prefix = this._get_problem_prefix(
      data_frame_name,
      series_data_model.series_name,
      index
    );

    // check that the value is string or ""
    // check that the value is a valid date
    // check that the value is a date and not a datetime
    // check that the value is a date and does not have a timezone
    //const value_date = this.parse_utc_date_time(value);
    const value_date = new Date(Date.parse(value));
    if (value !== null) {
      if (!(value_date instanceof Date)) {
        addLogMessage(
          `${problem_prefix} value is not of type Date but of type ${typeof value} while date model specifies this is series as Date`
        );
        return false;
      }
      //TODO validate that this is a date and not a datetime
      // if (value_date.getHours() !== 0 || value_date.getMinutes() !== 0 || value_date.getSeconds() !== 0 || value_date.getMilliseconds() !== 0) {
      //     addLogMessage(
      //         `${problem_prefix} value ${value.toString()} has a time specified as H${value_date.getHours()}:M${value_date.getMinutes()}:S${value_date.getSeconds()}:m${value_date.getMilliseconds()}`
      //     );
      // }

      // if (value_date.getTimezoneOffset() !== 0) {
      //     addLogMessage(
      //         `${problem_prefix} value ${value.toString()} has a timezone specified as ${value_date.getTimezoneOffset()}`
      //     );
      // }
    }
    return true;
  }

  public validate_data_element_date_time(
    index: string,
    value: string,
    data_frame_name: string,
    series_data_model: SeriesDataModelSchema,
    addLogMessage: (message: string) => void
  ): boolean {
    // follows "YYYY-MM-DDTHH:MM:SS+ZZ:ZZ" https://microformats.org/wiki/datetime-design-pattern
    const problem_prefix = this._get_problem_prefix(
      data_frame_name,
      series_data_model.series_name,
      index
    );
    // check that the value is string or ""
    // check that the value is a valid date time
    if (value === '') {
      addLogMessage(`${problem_prefix} value is empty`);
      return false;
    } else {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        addLogMessage(
          `${problem_prefix} value ${value} is not a valid date time`
        );
        return false;
      }
    }
    return true;
  }

  public validate_data_element_interval(
    index: string,
    value: string,
    data_frame_name: string,
    series_data_model: SeriesDataModelSchema,
    addLogMessage: (message: string) => void
  ): boolean {
    const problem_prefix = this._get_problem_prefix(
      data_frame_name,
      series_data_model.series_name,
      index
    );
    // check that the series parses as float
    // check that every value is between min an max if specified
    // check that every value is in resolution if specified

    const value_float = parseFloat(value);
    if (isNaN(value_float)) {
      addLogMessage(
        problem_prefix +
          ` value "${value}" does not parse as valid float while date model specifies this is series as Interval`
      );
      return false;
    }
    if (series_data_model.min) {
      if (value_float < series_data_model.min) {
        addLogMessage(
          problem_prefix +
            ` value is smaller than specified minimum of : ${series_data_model.min}`
        );
        return false;
      }
    }

    if (series_data_model.max) {
      if (series_data_model.max < value_float) {
        addLogMessage(
          problem_prefix +
            ` value is larger than specified maximum of : ${series_data_model.max}`
        );
        return false;
      }
    }

    if (series_data_model.resolution) {
      if (0.0001 < value_float % series_data_model.resolution) {
        addLogMessage(
          problem_prefix +
            ` value is out of specified resultion  ${series_data_model.resolution} by more than 0.0001`
        );
        return false;
      }
    }
    return true;
  }

  public validate_data_element_ratio(
    index: string,
    value: string,
    data_frame_name: string,
    series_data_model: SeriesDataModelSchema,
    addLogMessage: (message: string) => void
  ): boolean {
    const problem_prefix = this._get_problem_prefix(
      data_frame_name,
      series_data_model.series_name,
      index
    );
    // check that the value is string or ""
    // check that the value is a valid interval
    const value_float = parseFloat(value);
    if (isNaN(value_float)) {
      addLogMessage(
        problem_prefix +
          ` value "${value}" does not parse as valid float while date model specifies this is series as Ratio`
      );
      return false;
    }

    if (series_data_model.min !== null) {
      if (value_float < 0) {
        addLogMessage(
          problem_prefix +
            ` value "${value}" is smaller than 0 while date model specifies this is series as Ratio`
        );
        return false;
      }
    }

    if (series_data_model.max !== null) {
      if (1 < value_float) {
        addLogMessage(
          problem_prefix +
            ` value "${value}" is larger than 1 while date model specifies this is series as Ratio`
        );
        return false;
      }
    }
    return true;
  }

  public validate_data_element_unique(
    index: string,
    value: string,
    data_frame_name: string,
    series_data_model: SeriesDataModelSchema,
    addLogMessage: (message: string) => void
  ): boolean {
    const problem_prefix = this._get_problem_prefix(
      data_frame_name,
      series_data_model.series_name,
      index
    );
    // check that the value is string or ""
    if (value === '') {
      addLogMessage(`${problem_prefix} value is empty`);
      return false;
    }
    return true;
  }
}

export async function validateFile(
  file: File,
  dataframeDataModel: TDataFrameDataModel,
  addLogMessage: (message: string) => void
): Promise<boolean> {
  addLogMessage('Validating ' + file.name + '...');
  let valid = true;
  // Validate the file with the data frame data model
  const validator = new ValidatorCsv();
  const parsePromise = new Promise<boolean>((resolve) => {
    papaparse.parse(file, {
      header: true,
      beforeFirstChunk: function (chunk: string) {
        const rows = chunk.split(/\r\n|\n/);
        const headers = rows[0].split(',');
        // remove the first element of the array
        headers.shift();
        valid =
          valid &&
          validator.validate_headers(
            dataframeDataModel,
            headers,
            addLogMessage
          );
      },
      step: function (results: { data: any }) {
        valid =
          valid &&
          validator.validate_data_row(
            results.data,
            dataframeDataModel,
            addLogMessage
          );
      },
      complete: function () {
        // Resolve the Promise with the final value of valid
        resolve(valid);
      }
    });
  });
  const validationResult = await parsePromise;
  return validationResult;
}
