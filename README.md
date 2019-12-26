# site-weather-api

API Request Types
---------------
- [`lookup`](#lookup) 
- [`list`](#list)
- [`status`](#status)

API Requests
--------------
#### `lookup`

  Syntax:
    ```/lookup/[lat],[long]/(time)?days=(days)```
  
  Parameters:
  - Comma separated latitude and longitude
  - time - optional in YYYYMMDD format from which date to request information for
  - days - optional number of historical days to pull information for
  
  Apart from `requestedTime` all time information is Unix Epoch time
  E.g. Request
  
```http request
  GET http://server/lookup/18.52043,73.856743
  
  { 
     "latitude":18.52043,
     "longitude":73.856743,
     "requestedTime":"2019-12-25T15:41:06.073Z",
     "data":[ 
        { 
           "time":1577212200,
           "precipType":"rain",
           "temperatureHigh":83.17,
           "temperatureLow":68.13,
           "humidity":0.75
        },
        { 
           "time":1577125800,
           "precipType":"rain",
           "temperatureHigh":85.46,
           "temperatureLow":67.51,
           "humidity":0.73
        },
        { 
           "time":1577039400,
           "precipType":"rain",
           "temperatureHigh":85.4,
           "temperatureLow":65.51,
           "humidity":0.74
        },
        { 
           "time":1576953000,
           "precipType":"rain",
           "temperatureHigh":83.74,
           "temperatureLow":65.08,
           "humidity":0.67
        },
        { 
           "time":1576866600,
           "temperatureHigh":85.5,
           "temperatureLow":63.8,
           "humidity":0.65
        },
        { 
           "time":1576780200,
           "temperatureHigh":84.98,
           "temperatureLow":62.02,
           "humidity":0.69
        },
        { 
           "time":1576693800,
           "precipType":"rain",
           "temperatureHigh":84.89,
           "temperatureLow":60.91,
           "humidity":0.69
        }
     ]
  }
```
#### `list`
  Syntax:
      `/list`
      
  Returns an array of __all__ the lookups that have been done
  
#### `status`
  Syntax:
      `/status`
   
  Sends a static status message 
```http request
  GET http://server/status
  
  {
     "message":"ok"
  }
```
