<https://developer.mozilla.org/en-US/docs/Web/CSS/font>T

he font property may be specified as either a single keyword, which will select a system font, or as a shorthand for various font-related properties.

If font is specified as a system keyword, it must be one of: caption, icon, menu, message-box, small-caption, status-bar.

If font is specified as a shorthand for several font-related properties, then:

it must include values for:
<font-size>
<font-family>
it may optionally include values for:
<font-style>
<font-variant>
<font-weight>
<line-height>

- **font-style, font-variant and font-weight must** ***precede*** **font-size**

- font-variant may only specify the values defined in CSS 2.1, that is normal and small-caps
- line-height must immediately follow font-size, preceded by "/", like this: "16px/3"
- font-family must be the last value specified.