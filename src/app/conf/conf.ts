import { Validators } from "@angular/forms";

// WORKFLOW EDITOR CONFIG START //

export enum LAYOUT_TYPES {
  CARD = "CARD",
  WELL = "WELL",
  FIELDSET = "FIELDSET",
  HR_LINE = "HR_LINE",
  PANEL = "PANEL",
  COLUMNS = "COLUMNS",
  CUSTOM = "CUSTOM",
  AUTO_ARRANGE = "AUTO_ARRANGE",
}
export const LAYOUTS = [
  {
    type: LAYOUT_TYPES.CARD,
    name: "Card",
    children: [],
    accessKey: "",
    icon: "stop",
  },
  {
    type: LAYOUT_TYPES.WELL,
    name: "Well",
    children: [],
    accessKey: "",
    icon: "square",
    display: {
      label: "well",
    },
  },
  {
    type: LAYOUT_TYPES.PANEL,
    name: "Panel",
    children: [],
    accessKey: "",
    icon: "list-alt",
  },
  {
    type: LAYOUT_TYPES.FIELDSET,
    name: "Field Set",
    children: [],
    accessKey: "",
    icon: "th-large",
  },
  // {
  //   type: LAYOUT_TYPES.COLUMNS,
  //   name: 'Columns',
  //   accessKey: ''
  // }
];

export enum APPEARANCE_TYPES {
  TEXTAREA = "textarea",
  INPUT = "input",
  SELECT = "select",
  CHECKBOX = "checkbox",
  MULTI_SELECT = "multi-select",
  RADIO = "radio",
  BULLET = "bullet",
  SSN = "SSN",
  PHONE = "phone",
  DATE = "date",
  FILE = "file",
}

export const TAB_CONFIG = {
  BOOLEAN: [
    {
      tabName: "Display",
      key: "display",
      type: "group",
      fields: [
        {
          name: "Label",
          required: true,
          controlName: "label",
          appearance: "input",
          type: "text",
          validators: [Validators.required],
        },
      ],
    },
    {
      tabName: "Appearance",
      key: "appearance",
      type: "group",
      fields: [
        {
          name: "Appearance",
          controlName: "appearanceType",
          appearance: "select",
          defaultValue: "radio",
          options: ["radio", "checkbox"],
          events: [
            {
              equal: ["radio", "checkbox"],
              type: "group",
              toggleControl: "values",
              scope: "controls.appearance",
              dataScope: "appearance.values",
              toggleDefaultValue: {
                radio: [
                  {
                    name: "True",
                    value: true,
                  },
                  {
                    name: "False",
                    value: false,
                  },
                ],
                checkbox: [],
              },
              toggleValidators: {
                radio: [Validators.required],
                checkbox: [],
              },
            },
            {
              equal: ["radio"],
              type: "control",
              scope: "controls.appearance",
              toggleControl: "layoutType",
              dataScope: "appearance.layoutType",
              toggleDefaultValue: {
                radio: "inline-block",
              },
              toggleValidators: {
                radio: [],
              },
            },
          ],
        },
        {
          name: "Layout Type",
          controlName: "layoutType",
          appearance: "radioOptions",
          defaultValue: "inline-block",
          options: [
            { name: "Horizontal", value: "inline-block" },
            { name: "Vertical", value: "block" },
          ],
          conditional: {
            show: true,
            when: "appearanceType",
            eq: ["radio"],
          },
        },
        {
          name: "Values",
          controlName: "values",
          appearance: "repeat",
          addButtonText: "Values",
          groupLabel: "Values",
          disableNew: true,
          conditional: {
            show: true,
            when: "appearanceType",
            eq: ["radio", "checkbox"],
          },
          limitOptions: {
            radio: 2,
            checkbox: -1,
          },
          validators: [],
          defaultValue: {
            radio: [
              {
                name: "True",
                value: true,
              },
              {
                name: "False",
                value: false,
              },
            ],
            checkbox: [],
          },
          options: {
            checkbox: [],
            radio: [
              {
                cssClass: "col-6 mt-2",
                label: "Label",
                required: true,
                name: "name",
                type: "text",
                validators: [Validators.required],
              },
              {
                cssClass: "col-6 mt-2",
                label: "Value",
                required: true,
                name: "value",
                disabled: true,
                type: "text",
                validators: [Validators.required],
              },
            ],
          },
        },
      ],
    },
    {
      tabName: "Validation",
      key: "validators",
      type: "group",
      fields: [
        {
          name: "Required",
          controlName: "required",
          appearance: "checkbox",
          defaultValue: false,
        },
        {
          name: "Editable",
          controlName: "editable",
          appearance: "checkbox",
          defaultValue: false,
        },
      ],
    },
  ],
  STRING: [
    {
      tabName: "Display",
      key: "display",
      type: "group",
      fields: [
        {
          name: "Label",
          required: true,
          controlName: "label",
          appearance: "input",
          type: "text",
          validators: [Validators.required],
        },
        {
          name: "Placeholder",
          controlName: "placeholder",
          appearance: "input",
          type: "text",
          defaultValue: "",
        },
      ],
    },
    {
      tabName: "Appearance",
      key: "appearance",
      type: "group",
      fields: [
        {
          name: "Appearance",
          controlName: "appearanceType",
          appearance: "select",
          defaultValue: "input",
          options: ["input", "radio", "select", "multi-select"],
          events: [
            {
              equal: ["radio", "select", "checkbox", "multi-select"],
              type: "group",
              toggleControl: "values",
              scope: "controls.appearance",
              dataScope: "appearance.values",
              toggleValidators: {
                radio: [Validators.required],
                select: [Validators.required],
                checkbox: [Validators.required],
                "multi-select": [Validators.required],
              },
            },
            {
              equal: ["radio"],
              type: "control",
              scope: "controls.appearance",
              dataScope: "appearance.layoutType",
              toggleControl: "layoutType",
              toggleDefaultValue: {
                radio: "inline-block",
              },
              toggleValidators: {
                radio: [],
              },
            },
            {
              equal: ["input", "select"],
              type: "control",
              scope: "controls.display",
              dataScope: "display.placeholder",
              toggleControl: "placeholder",
              toggleDefaultValue: {
                input: "",
                select: "",
              },
              toggleValidators: {
                input: [],
                select: [],
              },
            },
            {
              equal: ["input"],
              type: "control",
              scope: "controls.validators",
              dataScope: "validators.minLength",
              toggleControl: "minLength",
              toggleDefaultValue: {
                input: "",
              },
              toggleValidators: {
                input: [],
              },
            },
            {
              equal: ["input"],
              type: "control",
              scope: "controls.validators",
              dataScope: "validators.maxLength",
              toggleControl: "maxLength",
              toggleDefaultValue: {
                input: "",
              },
              toggleValidators: {
                input: [],
              },
            },
          ],
        },
        {
          name: "Layout Type",
          controlName: "layoutType",
          appearance: "radioOptions",
          options: [
            { name: "Horizontal", value: "inline-block" },
            { name: "Vertical", value: "block" },
          ],
          conditional: {
            show: true,
            when: "appearanceType",
            eq: ["radio"],
          },
        },
        {
          name: "Values",
          controlName: "values",
          appearance: "repeat",
          addButtonText: "Values",
          groupLabel: "Values",
          conditional: {
            show: true,
            when: "appearanceType",
            eq: ["select", "radio", "checkbox", "multi-select"],
          },
          validators: [],
          options: {
            "multi-select": [
              {
                cssClass: "col-5 mt-2",
                label: "Label",
                required: true,
                name: "name",
                type: "text",
                validators: [Validators.required],
              },
              {
                cssClass: "col-6 mt-2",
                label: "Value",
                required: true,
                name: "value",
                type: "text",
                validators: [Validators.required],
              },
            ],
            select: [
              {
                cssClass: "col-5 mt-2",
                label: "Label",
                required: true,
                name: "name",
                type: "text",
                validators: [Validators.required],
              },
              {
                cssClass: "col-6 mt-2",
                label: "Value",
                required: true,
                name: "value",
                type: "text",
                validators: [Validators.required],
              },
            ],
            radio: [
              {
                cssClass: "col-5 mt-2",
                label: "Label",
                required: true,
                name: "name",
                type: "text",
                validators: [Validators.required],
              },
              {
                cssClass: "col-6 mt-2",
                label: "Value",
                required: true,
                name: "value",
                type: "text",
                validators: [Validators.required],
              },
            ],
            checkbox: [
              {
                cssClass: "col-11 mt-2",
                label: "Label",
                required: true,
                name: "name",
                type: "text",
                validators: [Validators.required],
              },
            ],
          },
        },
      ],
    },
    {
      tabName: "Validation",
      key: "validators",
      type: "group",
      fields: [
        {
          name: "Min Length",
          controlName: "minLength",
          appearance: "input",
          type: "text",
          toNumber: true,
          defaultValue: null,
          mask: "0*",
        },
        {
          name: "Max Length",
          controlName: "maxLength",
          appearance: "input",
          type: "text",
          toNumber: true,
          defaultValue: null,
          mask: "0*",
        },
        {
          name: "Required",
          controlName: "required",
          appearance: "checkbox",
          defaultValue: false,
        },
        {
          name: "Editable",
          controlName: "editable",
          appearance: "checkbox",
          defaultValue: false,
        },
      ],
    },
  ],
  NUMBER: [
    {
      tabName: "Display",
      key: "display",
      type: "group",
      fields: [
        {
          name: "Label",
          required: true,
          controlName: "label",
          appearance: "input",
          validators: [Validators.required],
        },
        {
          name: "Placeholder",
          controlName: "placeholder",
          appearance: "input",
          defaultValue: "",
        },
      ],
    },
    {
      tabName: "Appearance",
      key: "appearance",
      type: "group",
      fields: [
        {
          name: "Appearance",
          controlName: "appearanceType",
          appearance: "select",
          defaultValue: "input",
          options: ["input", "radio", "select"],
          events: [
            {
              equal: ["radio", "select", "checkbox"],
              type: "group",
              toggleControl: "values",
              scope: "controls.appearance",
              toggleValidators: {
                radio: [Validators.required],
                select: [Validators.required],
                checkbox: [Validators.required],
              },
            },
            {
              equal: ["radio"],
              type: "control",
              scope: "controls.appearance",
              toggleControl: "layoutType",
              toggleValidators: {
                radio: [],
              },
            },
            {
              equal: ["input", "select"],
              type: "control",
              scope: "controls.display",
              toggleControl: "placeholder",
              toggleValidators: {
                input: [],
                select: [],
              },
            },
            {
              equal: ["input"],
              type: "control",
              scope: "controls.validators",
              toggleControl: "minLength",
              toggleValidators: {
                input: [],
              },
            },
            {
              equal: ["input"],
              type: "control",
              scope: "controls.validators",
              toggleControl: "maxLength",
              toggleValidators: {
                input: [],
              },
            },
          ],
        },
        {
          name: "Layout Type",
          controlName: "layoutType",
          appearance: "radioOptions",
          conditional: {
            show: true,
            when: "appearanceType",
            eq: ["radio"],
          },
        },
        {
          name: "Values",
          controlName: "values",
          appearance: "repeat",
          addButtonText: "values",
          groupLabel: "Values",
          conditional: {
            show: true,
            when: "appearanceType",
            eq: ["select", "radio", "checkbox"],
          },
          validators: [],
          options: {
            "multi-select": [
              {
                cssClass: "col-5 mt-2",
                label: "Label",
                required: true,
                name: "name",
                type: "text",
                validators: [Validators.required],
              },
              {
                cssClass: "col-6 mt-2",
                label: "Value",
                required: true,
                name: "value",
                type: "text",
                validators: [Validators.required],
              },
            ],
            select: [
              {
                cssClass: "col-5 mt-2",
                label: "Label",
                required: true,
                name: "name",
                type: "text",
                validators: [Validators.required],
              },
              {
                cssClass: "col-6 mt-2",
                label: "Value",
                required: true,
                name: "value",
                type: "text",
                validators: [Validators.required],
              },
            ],
            radio: [
              {
                cssClass: "col-5 mt-2",
                label: "Label",
                required: true,
                name: "name",
                type: "text",
                validators: [Validators.required],
              },
              {
                cssClass: "col-6 mt-2",
                label: "Value",
                required: true,
                name: "value",
                type: "text",
                validators: [Validators.required],
              },
            ],
            checkbox: [
              {
                cssClass: "col-11 mt-2",
                label: "Label",
                required: true,
                name: "name",
                type: "text",
                validators: [Validators.required],
              },
            ],
          },
        },
      ],
    },
    {
      tabName: "Validation",
      key: "validators",
      type: "group",
      fields: [
        {
          name: "Min Value",
          controlName: "minValue",
          appearance: "input",
          type: "text",
          toNumber: true,
          mask: "0*",
        },
        {
          name: "Max Value",
          controlName: "maxValue",
          appearance: "input",
          type: "text",
          toNumber: true,
          mask: "0*",
        },
        {
          name: "Required",
          controlName: "required",
          appearance: "checkbox",
          defaultValue: false,
        },
        {
          name: "Editable",
          controlName: "editable",
          appearance: "checkbox",
          defaultValue: false,
        },
      ],
    },
  ],
  ARRAY: [
    {
      tabName: "Display",
      key: "display",
      type: "group",
      fields: [
        {
          name: "Label",
          required: true,
          controlName: "label",
          appearance: "input",
          validators: [Validators.required],
        },
      ],
    },
    {
      tabName: "Appearance",
      key: "appearance",
      type: "group",
      fields: [
        {
          name: "Appearance",
          controlName: "appearanceType",
          appearance: "select",
          defaultValue: "bullet",
          options: ["bullet"],
        },
        {
          name: "Values",
          controlName: "values",
          appearance: "repeat",
          addButtonText: "values",
          groupLabel: "Values",
          validators: [],
          disableNew: true,
          defaultValue: ["Sample value 1", "Sample value 2"],
          options: {
            default: [
              {
                cssClass: "col-11 mt-2",
                label: "Label",
                required: true,
                name: "name",
                type: "text",
                validators: [Validators.required],
              },
            ],
          },
        },
      ],
    },
  ],
  HR_LINE: [
    {
      tabName: "Appearance",
      key: "appearance",
      type: "group",
      fields: [
        {
          name: "Width (%)",
          controlName: "width",
          appearance: "input",
        },
        {
          name: "Height (px)",
          controlName: "height",
          appearance: "input",
        },
      ],
    },
  ],
  CARD: [
    {
      tabName: "Display",
      key: "display",
      type: "group",
      fields: [
        {
          name: "Label",
          required: true,
          controlName: "label",
          type: "text",
          appearance: "input",
          validators: [Validators.required],
        },
      ],
    },
    // {
    //   tabName: 'Appearance',
    //   key: 'appearance',
    //   type: 'group',
    //   fields: [
    //     {
    //       name: 'Background Color ',
    //       controlName: 'bgColor',
    //       appearance: 'color',
    //       defaultValue: '#ffffff'
    //     },
    //     {
    //       name: 'Color ',
    //       controlName: 'color',
    //       appearance: 'color'
    //     },
    //     {
    //       name: 'Font Size (px)',
    //       controlName: 'fontSize',
    //       appearance: 'input',
    //       type: 'number'
    //     },
    //     {
    //       name: 'Icon',
    //       controlName: 'icon',
    //       appearance: 'select',
    //       nameKey: 'name',
    //       returnKey: 'value',
    //       options: [
    //         { name: 'Users', value: 'fa fa-users' },
    //         { name: 'Address', value: 'fa fa-address-card-o' }
    //       ]
    //     }
    //   ]
    // }
  ],
  PANEL: [
    {
      tabName: "Display",
      key: "display",
      type: "group",
      fields: [
        {
          name: "Label",
          type: "text",
          controlName: "label",
          appearance: "input",
          validators: [Validators.required],
        },
      ],
    },
    {
      tabName: "Appearance",
      key: "appearance",
      type: "group",
      fields: [
        {
          name: "Background Color ",
          controlName: "bgColor",
          appearance: "color",
        },
        {
          name: "Color ",
          controlName: "color",
          appearance: "color",
        },
        {
          name: "Font Size (px)",
          controlName: "fontSize",
          appearance: "input",
          type: "text",
          toNumber: true,
          mask: "0*",
        },
      ],
    },
  ],
  WELL: [
    {
      tabName: "Appearance",
      key: "appearance",
      type: "group",
      fields: [
        {
          name: "Border Width (px)",
          controlName: "width",
          appearance: "input",
          type: "text",
          toNumber: true,
          mask: "0*",
        },
        {
          name: "Style",
          controlName: "borderType",
          appearance: "select",
          defaultValue: "solid",
          options: ["solid", "dashed", "dotted"],
        },
        {
          name: "Color ",
          controlName: "color",
          appearance: "color",
        },
      ],
    },
  ],
  FIELDSET: [
    {
      tabName: "Display",
      key: "display",
      type: "group",
      fields: [
        {
          name: "Label",
          required: true,
          controlName: "label",
          appearance: "input",
          type: "text",
          validators: [Validators.required],
        },
      ],
    },
  ],
  COLUMNS: [
    {
      tabName: "Appearance",
      key: "appearance",
      type: "group",
      fields: [
        {
          name: "Columns",
          controlName: "columnsCount",
          appearance: "select",
          defaultValue: "",
          options: ["1", "2", "3"],
          events: [
            {
              equal: ["1", "2", "3"],
              type: "custom",
              toggleControl: "columns",
              scope: "controls.appearance",
            },
          ],
        },
        {
          name: "Values",
          controlName: "values",
          appearance: "repeat",
          addButtonText: "Values",
          groupLabel: "Values",
          conditional: {
            show: true,
            when: "appearanceType",
            eq: ["select", "radio", "checkbox", "multi-select"],
          },
          validators: [],
          options: {
            "multi-select": [
              {
                cssClass: "col-5 mt-2",
                label: "Label",
                required: true,
                name: "name",
                type: "text",
                validators: [Validators.required],
              },
              {
                cssClass: "col-6 mt-2",
                label: "Value",
                required: true,
                name: "value",
                type: "text",
                validators: [Validators.required],
              },
            ],
            select: [
              {
                cssClass: "col-5 mt-2",
                label: "Label",
                required: true,
                name: "name",
                type: "text",
                validators: [Validators.required],
              },
              {
                cssClass: "col-6 mt-2",
                label: "Value",
                required: true,
                name: "value",
                type: "text",
                validators: [Validators.required],
              },
            ],
            radio: [
              {
                cssClass: "col-5 mt-2",
                label: "Label",
                required: true,
                name: "name",
                type: "text",
                validators: [Validators.required],
              },
              {
                cssClass: "col-6 mt-2",
                label: "Value",
                required: true,
                name: "value",
                type: "text",
                validators: [Validators.required],
              },
            ],
            checkbox: [
              {
                cssClass: "col-11 mt-2",
                label: "Label",
                required: true,
                name: "name",
                type: "text",
                validators: [Validators.required],
              },
            ],
          },
        },
      ],
    },
  ],
};
// WORKFLOW EDITOR CONFIG END //
