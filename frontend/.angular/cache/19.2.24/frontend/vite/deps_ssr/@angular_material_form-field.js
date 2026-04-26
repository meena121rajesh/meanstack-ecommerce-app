import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  MatFormFieldModule
} from "./chunk-MNUMXMBF.js";
import {
  MAT_ERROR,
  MAT_FORM_FIELD,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MAT_PREFIX,
  MAT_SUFFIX,
  MatError,
  MatFormField,
  MatFormFieldControl,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix,
  getMatFormFieldDuplicatedHintError,
  getMatFormFieldMissingControlError,
  getMatFormFieldPlaceholderConflictError
} from "./chunk-6SNUYU5N.js";
import "./chunk-3Y6EHRK7.js";
import "./chunk-AXBSHL2C.js";
import "./chunk-4RDMPS2O.js";
import "./chunk-IO7M3WBW.js";
import "./chunk-JME5XKN5.js";
import "./chunk-VCD47RGI.js";
import "./chunk-2IFFPY2J.js";
import "./chunk-6MOBYI5B.js";
import "./chunk-YTHGTYN7.js";
import "./chunk-XFF5S4VV.js";
import "./chunk-TNBOD3B5.js";
import {
  require_operators
} from "./chunk-XCIYP5SE.js";
import {
  require_cjs
} from "./chunk-ZUJ64LXG.js";
import "./chunk-OYTRG5F6.js";
import {
  __toESM
} from "./chunk-YHCV7DAQ.js";

// node_modules/@angular/material/fesm2022/form-field.mjs
var import_rxjs = __toESM(require_cjs(), 1);
var import_operators = __toESM(require_operators(), 1);
var matFormFieldAnimations = {
  // Represents:
  // trigger('transitionMessages', [
  //   // TODO(mmalerba): Use angular animations for label animation as well.
  //   state('enter', style({opacity: 1, transform: 'translateY(0%)'})),
  //   transition('void => enter', [
  //     style({opacity: 0, transform: 'translateY(-5px)'}),
  //     animate('300ms cubic-bezier(0.55, 0, 0.55, 0.2)'),
  //   ]),
  // ])
  /** Animation that transitions the form field's error and hint messages. */
  transitionMessages: {
    type: 7,
    name: "transitionMessages",
    definitions: [{
      type: 0,
      name: "enter",
      styles: {
        type: 6,
        styles: {
          opacity: 1,
          transform: "translateY(0%)"
        },
        offset: null
      }
    }, {
      type: 1,
      expr: "void => enter",
      animation: [{
        type: 6,
        styles: {
          opacity: 0,
          transform: "translateY(-5px)"
        },
        offset: null
      }, {
        type: 4,
        styles: null,
        timings: "300ms cubic-bezier(0.55, 0, 0.55, 0.2)"
      }],
      options: null
    }],
    options: {}
  }
};
export {
  MAT_ERROR,
  MAT_FORM_FIELD,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MAT_PREFIX,
  MAT_SUFFIX,
  MatError,
  MatFormField,
  MatFormFieldControl,
  MatFormFieldModule,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix,
  getMatFormFieldDuplicatedHintError,
  getMatFormFieldMissingControlError,
  getMatFormFieldPlaceholderConflictError,
  matFormFieldAnimations
};
//# sourceMappingURL=@angular_material_form-field.js.map
