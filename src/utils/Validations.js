// Custom country validation function
const libPhoneNumber = require('libphonenumber-js');

function isCountryValid(country) {
  // Add your logic for country validation here
  const validCountries = [
    'afghanistan','amman', 'åland islands', 'albania', 'algeria', 'american samoa', 'andorra', 'angola', 'anguilla', 'antarctica',
    'antigua and barbuda', 'argentina', 'armenia', 'aruba', 'australia', 'austria', 'azerbaijan', 'bahamas', 'bahrain', 'bangladesh',
    'barbados', 'belarus', 'belgium', 'belize', 'benin', 'bermuda', 'bhutan', 'bolivia', 'bosnia and herzegovina', 'botswana',
    'bouvet island', 'brazil', 'british indian ocean territory', 'brunei darussalam', 'bulgaria', 'burkina faso', 'burundi', 'cambodia',
    'cameroon', 'canada', 'cape verde', 'cayman islands', 'central african republic', 'chad', 'chile', 'china', 'christmas island',
    'cocos (keeling) islands', 'colombia', 'comoros', 'congo', 'congo, the democratic republic of the', 'cook islands', 'costa rica',
    'cote d\'ivoire', 'croatia', 'cuba', 'cyprus', 'czech republic', 'denmark', 'djibouti', 'dominica', 'dominican republic', 'ecuador',
    'egypt', 'el salvador', 'equatorial guinea', 'eritrea', 'estonia', 'ethiopia', 'falkland islands (malvinas)', 'faroe islands',
    'fiji', 'finland', 'france', 'french guiana', 'french polynesia', 'french southern territories', 'gabon', 'gambia', 'georgia',
    'germany', 'ghana', 'gibraltar', 'greece', 'greenland', 'grenada', 'guadeloupe', 'guam', 'guatemala', 'guernsey', 'guinea',
    'guinea-bissau', 'guyana', 'haiti', 'heard island and mcdonald islands', 'holy see (vatican city state)', 'honduras', 'hong kong',
    'hungary', 'iceland', 'india', 'indonesia', 'iran, islamic republic of', 'iraq', 'ireland', 'isle of man', 'israel', 'italy',
    'jamaica', 'japan', 'jersey', 'jordan', 'kazakhstan', 'kenya', 'kiribati', 'korea, democratic people\'s republic of',
    'korea, republic of', 'kuwait', 'kyrgyzstan', 'lao people\'s democratic republic', 'latvia', 'lebanon', 'lesotho', 'liberia',
    'libyan arab jamahiriya', 'liechtenstein', 'lithuania', 'luxembourg', 'macao', 'macedonia, the former yugoslav republic of',
    'madagascar', 'malawi', 'malaysia', 'maldives', 'mali', 'malta', 'marshall islands', 'martinique', 'mauritania', 'mauritius',
    'mayotte', 'mexico', 'micronesia, federated states of', 'moldova, republic of', 'monaco', 'mongolia', 'montenegro', 'montserrat',
    'morocco', 'mozambique', 'myanmar', 'namibia', 'nauru', 'nepal', 'netherlands', 'netherlands antilles', 'new caledonia', 'new zealand',
    'nicaragua', 'niger', 'nigeria', 'niue', 'norfolk island', 'northern mariana islands', 'norway', 'oman', 'pakistan', 'palau', 'palestinian territory, occupied',
    'panama', 'papua new guinea', 'paraguay', 'peru', 'philippines', 'pitcairn', 'poland', 'portugal', 'puerto rico', 'qatar', 'reunion',
    'romania', 'russian federation', 'rwanda', 'saint helena', 'saint kitts and nevis', 'saint lucia', 'saint pierre and miquelon',
    'saint vincent and the grenadines', 'samoa', 'san marino', 'sao tome and principe', 'saudi arabia', 'senegal', 'serbia', 'seychelles',
    'sierra leone', 'singapore', 'slovakia', 'slovenia', 'solomon islands', 'somalia', 'south africa', 'south georgia and the south sandwich islands',
    'spain', 'sri lanka', 'sudan', 'suriname', 'svalbard and jan mayen', 'swaziland', 'sweden', 'switzerland', 'syrian arab republic', 'taiwan, province of china',
    'tajikistan', 'tanzania, united republic of', 'thailand', 'timor-leste', 'togo', 'tokelau', 'tonga', 'trinidad and tobago', 'tunisia', 'turkey', 'turkmenistan',
    'turks and caicos islands', 'tuvalu', 'uganda', 'ukraine', 'united arab emirates', 'united kingdom', 'united states', 'united states minor outlying islands', 'uruguay',
    'uzbekistan', 'vanuatu', 'venezuela', 'viet nam', 'virgin islands, british', 'virgin islands, u.s.', 'wallis and futuna', 'western sahara', 'yemen', 'zambia', 'zimbabwe'
  ];

  return validCountries.includes(country.toLowerCase());
}

// Custom decorator using the isCountryValid function
function IsCountry(validationOptions) {
  return function (object, propertyName) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value) {
          return isCountryValid(value);
        },
        defaultMessage() {
          return 'Invalid country';
        },
      },
    });
  };
}

// Custom phone number validation function
// Custom phone number validation function
function isPhoneNumberValid(number, country) {
  let phoneRegex;

  // Normalize country name to lowercase for case-insensitive comparison
  const normalizedCountry = country.toLowerCase();

  // Customize the regular expression based on the country
  switch (normalizedCountry) {
    case 'us':
      phoneRegex = /^[0-9]{10}$/; // Example: 10-digit numeric phone number for the US
      break;
    case 'uk':
      phoneRegex = /^[0-9]{11}$/; // Example: 11-digit numeric phone number for the UK
      break;
    case 'egypt':
      phoneRegex = /^[0-9]{11}$/; // Example: 11-digit numeric phone number for Egypt
      break;
    case 'india':
      phoneRegex = /^[0-9]{10}$/; // Example: 10-digit numeric phone number for India
      break;
    case 'canada':
      phoneRegex = /^[0-9]{10}$/; // Example: 10-digit numeric phone number for Canada
      break;
    case 'australia':
      phoneRegex = /^[0-9]{9}$/; // Example: 9-digit numeric phone number for Australia
      break;
    case 'amman':
      phoneRegex = /^[0-9]{9}$/; // Example: 9-digit numeric phone number for Amman, Jordan
      break;
    // Add more cases for other countries as needed
    case 'germany':
      phoneRegex = /^[0-9]{11}$/; // Example: 11-digit numeric phone number for Germany
      break;
    case 'france':
      phoneRegex = /^[0-9]{10}$/; // Example: 10-digit numeric phone number for France
      break;
    // ... (Add more cases as needed)
    default:
      phoneRegex = /^[0-9]{10}$/; // Default to a 10-digit numeric phone number
  }

  return phoneRegex.test(number);
}

// Custom decorator using the isPhoneNumberValid function
function IsPhoneNumber(validationOptions) {
  return function (object, propertyName) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value, { object: instance }) {
          const country = instance.country; // Assuming you have a 'country' property in your class
          return isPhoneNumberValid(value, country);
        },
        defaultMessage() {
          return 'Invalid phone number format';
        },
      },
    });
  };
}

function isPalindrome(str) {
  // Remove spaces and convert to lowercase
  const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  // Reverse the string
  const reversedStr = cleanedStr.split('').reverse().join('');

  // Compare the original and reversed strings
  return cleanedStr === reversedStr;
}

module.exports = {
  IsPhoneNumber,
  isPhoneNumberValid,
  IsCountry,
  isCountryValid,
  isPalindrome
};
