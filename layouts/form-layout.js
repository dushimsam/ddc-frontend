import Alert from "../components/alert";
import React, { useEffect, useState } from 'react'
import styles from '../styles/components/Breadcrumb.module.css'
import globalStyles from "../styles/global-colors.module.css"

export const FormLayout = ({
  Content,
  alert,
  title,
  setAlert,
  btnTxt,
  disable,
  callFun,
  loading,
  setLoading,
}) => {
  return (
    <div className="pb-5">

        {
            title ?<>
                <h4 className="font-weight-bold text-dark pl-5 pl-md-0">
                    {title}
                </h4>
                <hr/>
            </>:<></>
        }

      <div className="mt-4" style={{ fontSize: "0.85em" }}>
        {alert.show ? (
          <Alert
            className={"my-3 alert-" + alert.class}
            message={alert.message}
            setAlert={setAlert}
          />
        ) : null}
        {Content}
        <div className="form-row">
          <div className="form-group mt-3">
            <button
                type="button"
                className={'btn btn-danger ml-5 ml-md-0 px-md-3 shadow'}
                onClick={() => {setLoading(true);callFun();}}
                disabled={!disable}
            >
              {loading ? (
                <img
                  src={"/img/loader.gif"}
                  alt={"Loading"}
                  className={"loader"}
                />
              ) : (
                btnTxt
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;













[
  {
      "active": true,
      "_id": "609901d65e503f9f8cec5b6a",
      "part_in_stock": {
          "active": true,
          "_id": "6091494a852056c613ad3b79",
          "supplies": [
              {
                  "createdAt": "2021-05-04T12:49:49.795Z",
                  "_id": "6091494a852056c613ad3b7a",
                  "supplied_part": {
                      "active": true,
                      "_id": "60914949852056c613ad3b75",
                      "part_supply": {
                          "supply_price": 30003000,
                          "active": true,
                          "_id": "60914948852056c613ad3b73",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "1620134120001",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-04T13:16:57.793Z",
                          "createdAt": "2021-05-04T13:16:56.909Z",
                          "__v": 0
                      },
                      "quantity": 3000,
                      "spare_part": {
                          "description": {
                              "fit_note": "Hinge Assy-Trunk Lid, LH"
                          },
                          "showcase": false,
                          "active": true,
                          "_id": "60910625e1c0d2bb8e312637",
                          "name": "Hinge Assy-Trunk Lid, LH",
                          "part_code": "79210-1R000",
                          "part_number": "79210",
                          "sub_category": {
                              "_id": "60904968e1c0d2bb8e312634",
                              "sub_category": {
                                  "_id": "609043c2e1c0d2bb8e312632",
                                  "name": "Cowl Panel",
                                  "description": "Cowl Panel",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-03T18:41:06.473Z",
                                  "createdAt": "2021-05-03T18:41:06.473Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-03T19:05:12.365Z",
                              "createdAt": "2021-05-03T19:05:12.365Z",
                              "__v": 0
                          },
                          "release_year": 2015,
                          "photos": [
                              {
                                  "_id": "60910625e1c0d2bb8e312638",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-60910625e1c0d2bb8e312637.png"
                              }
                          ],
                          "updatedAt": "2021-06-01T08:04:27.339Z",
                          "createdAt": "2021-05-04T08:30:29.054Z",
                          "__v": 1
                      },
                      "supply_price": 3000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-04T13:16:58.415Z",
                      "createdAt": "2021-05-04T13:16:57.739Z",
                      "__v": 0
                  },
                  "quantity": 3000
              },
              {
                  "createdAt": "2021-05-09T12:55:23.163Z",
                  "_id": "6098d5d72824672c1d2ae0bf",
                  "supplied_part": {
                      "active": true,
                      "_id": "6098d5d72824672c1d2ae0bd",
                      "part_supply": {
                          "supply_price": 20004000,
                          "active": true,
                          "_id": "6098d5d62824672c1d2ae0bc",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "1620628773933",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-10T06:42:31.324Z",
                          "createdAt": "2021-05-10T06:42:30.551Z",
                          "__v": 0
                      },
                      "quantity": 200,
                      "spare_part": {
                          "description": {
                              "fit_note": "Hinge Assy-Trunk Lid, LH"
                          },
                          "showcase": false,
                          "active": true,
                          "_id": "60910625e1c0d2bb8e312637",
                          "name": "Hinge Assy-Trunk Lid, LH",
                          "part_code": "79210-1R000",
                          "part_number": "79210",
                          "sub_category": {
                              "_id": "60904968e1c0d2bb8e312634",
                              "sub_category": {
                                  "_id": "609043c2e1c0d2bb8e312632",
                                  "name": "Cowl Panel",
                                  "description": "Cowl Panel",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-03T18:41:06.473Z",
                                  "createdAt": "2021-05-03T18:41:06.473Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-03T19:05:12.365Z",
                              "createdAt": "2021-05-03T19:05:12.365Z",
                              "__v": 0
                          },
                          "release_year": 2015,
                          "photos": [
                              {
                                  "_id": "60910625e1c0d2bb8e312638",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-60910625e1c0d2bb8e312637.png"
                              }
                          ],
                          "updatedAt": "2021-06-01T08:04:27.339Z",
                          "createdAt": "2021-05-04T08:30:29.054Z",
                          "__v": 1
                      },
                      "supply_price": 2000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-10T06:42:31.713Z",
                      "createdAt": "2021-05-10T06:42:31.124Z",
                      "__v": 0
                  },
                  "quantity": 200
              },
              {
                  "createdAt": "2021-05-09T12:55:23.163Z",
                  "_id": "6098d60b2824672c1d2ae0ca",
                  "supplied_part": {
                      "active": true,
                      "_id": "6098d60b2824672c1d2ae0c8",
                      "part_supply": {
                          "supply_price": 20004000,
                          "active": true,
                          "_id": "6098d60a2824672c1d2ae0c7",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "1620628773933",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-10T06:43:23.614Z",
                          "createdAt": "2021-05-10T06:43:22.865Z",
                          "__v": 0
                      },
                      "quantity": 200,
                      "spare_part": {
                          "description": {
                              "fit_note": "Hinge Assy-Trunk Lid, LH"
                          },
                          "showcase": false,
                          "active": true,
                          "_id": "60910625e1c0d2bb8e312637",
                          "name": "Hinge Assy-Trunk Lid, LH",
                          "part_code": "79210-1R000",
                          "part_number": "79210",
                          "sub_category": {
                              "_id": "60904968e1c0d2bb8e312634",
                              "sub_category": {
                                  "_id": "609043c2e1c0d2bb8e312632",
                                  "name": "Cowl Panel",
                                  "description": "Cowl Panel",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-03T18:41:06.473Z",
                                  "createdAt": "2021-05-03T18:41:06.473Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-03T19:05:12.365Z",
                              "createdAt": "2021-05-03T19:05:12.365Z",
                              "__v": 0
                          },
                          "release_year": 2015,
                          "photos": [
                              {
                                  "_id": "60910625e1c0d2bb8e312638",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-60910625e1c0d2bb8e312637.png"
                              }
                          ],
                          "updatedAt": "2021-06-01T08:04:27.339Z",
                          "createdAt": "2021-05-04T08:30:29.054Z",
                          "__v": 1
                      },
                      "supply_price": 2000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-10T06:43:23.909Z",
                      "createdAt": "2021-05-10T06:43:23.368Z",
                      "__v": 0
                  },
                  "quantity": 200
              },
              {
                  "createdAt": "2021-05-09T12:55:23.163Z",
                  "_id": "6098d8802824672c1d2ae0dc",
                  "supplied_part": {
                      "active": true,
                      "_id": "6098d87f2824672c1d2ae0d6",
                      "part_supply": {
                          "supply_price": 2000,
                          "active": true,
                          "_id": "6098d87f2824672c1d2ae0d4",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "1620628773933",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-10T06:53:51.687Z",
                          "createdAt": "2021-05-10T06:53:51.121Z",
                          "__v": 0
                      },
                      "quantity": 200,
                      "spare_part": {
                          "description": {
                              "fit_note": "Hinge Assy-Trunk Lid, LH"
                          },
                          "showcase": false,
                          "active": true,
                          "_id": "60910625e1c0d2bb8e312637",
                          "name": "Hinge Assy-Trunk Lid, LH",
                          "part_code": "79210-1R000",
                          "part_number": "79210",
                          "sub_category": {
                              "_id": "60904968e1c0d2bb8e312634",
                              "sub_category": {
                                  "_id": "609043c2e1c0d2bb8e312632",
                                  "name": "Cowl Panel",
                                  "description": "Cowl Panel",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-03T18:41:06.473Z",
                                  "createdAt": "2021-05-03T18:41:06.473Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-03T19:05:12.365Z",
                              "createdAt": "2021-05-03T19:05:12.365Z",
                              "__v": 0
                          },
                          "release_year": 2015,
                          "photos": [
                              {
                                  "_id": "60910625e1c0d2bb8e312638",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-60910625e1c0d2bb8e312637.png"
                              }
                          ],
                          "updatedAt": "2021-06-01T08:04:27.339Z",
                          "createdAt": "2021-05-04T08:30:29.054Z",
                          "__v": 1
                      },
                      "supply_price": 2000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-10T06:53:52.256Z",
                      "createdAt": "2021-05-10T06:53:51.683Z",
                      "__v": 0
                  },
                  "quantity": 200
              },
              {
                  "createdAt": "2021-05-09T12:55:23.163Z",
                  "_id": "6098d8862824672c1d2ae0ec",
                  "supplied_part": {
                      "active": true,
                      "_id": "6098d8862824672c1d2ae0e4",
                      "part_supply": {
                          "supply_price": 20004000,
                          "active": true,
                          "_id": "6098d8852824672c1d2ae0e3",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "1620628773933",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-10T06:53:58.484Z",
                          "createdAt": "2021-05-10T06:53:57.675Z",
                          "__v": 0
                      },
                      "quantity": 200,
                      "spare_part": {
                          "description": {
                              "fit_note": "Hinge Assy-Trunk Lid, LH"
                          },
                          "showcase": false,
                          "active": true,
                          "_id": "60910625e1c0d2bb8e312637",
                          "name": "Hinge Assy-Trunk Lid, LH",
                          "part_code": "79210-1R000",
                          "part_number": "79210",
                          "sub_category": {
                              "_id": "60904968e1c0d2bb8e312634",
                              "sub_category": {
                                  "_id": "609043c2e1c0d2bb8e312632",
                                  "name": "Cowl Panel",
                                  "description": "Cowl Panel",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-03T18:41:06.473Z",
                                  "createdAt": "2021-05-03T18:41:06.473Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-03T19:05:12.365Z",
                              "createdAt": "2021-05-03T19:05:12.365Z",
                              "__v": 0
                          },
                          "release_year": 2015,
                          "photos": [
                              {
                                  "_id": "60910625e1c0d2bb8e312638",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-60910625e1c0d2bb8e312637.png"
                              }
                          ],
                          "updatedAt": "2021-06-01T08:04:27.339Z",
                          "createdAt": "2021-05-04T08:30:29.054Z",
                          "__v": 1
                      },
                      "supply_price": 2000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-10T06:53:58.830Z",
                      "createdAt": "2021-05-10T06:53:58.233Z",
                      "__v": 0
                  },
                  "quantity": 200
              },
              {
                  "createdAt": "2021-05-10T07:20:37.871Z",
                  "_id": "609901d55e503f9f8cec5b63",
                  "supplied_part": {
                      "active": true,
                      "_id": "609901d55e503f9f8cec5b5b",
                      "part_supply": {
                          "supply_price": 19991999,
                          "active": true,
                          "_id": "609901d45e503f9f8cec5b59",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "1620640170268",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-10T09:50:13.338Z",
                          "createdAt": "2021-05-10T09:50:12.392Z",
                          "__v": 0
                      },
                      "quantity": 2000,
                      "spare_part": {
                          "description": {
                              "fit_note": "Hinge Assy-Trunk Lid, LH"
                          },
                          "showcase": false,
                          "active": true,
                          "_id": "60910625e1c0d2bb8e312637",
                          "name": "Hinge Assy-Trunk Lid, LH",
                          "part_code": "79210-1R000",
                          "part_number": "79210",
                          "sub_category": {
                              "_id": "60904968e1c0d2bb8e312634",
                              "sub_category": {
                                  "_id": "609043c2e1c0d2bb8e312632",
                                  "name": "Cowl Panel",
                                  "description": "Cowl Panel",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-03T18:41:06.473Z",
                                  "createdAt": "2021-05-03T18:41:06.473Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-03T19:05:12.365Z",
                              "createdAt": "2021-05-03T19:05:12.365Z",
                              "__v": 0
                          },
                          "release_year": 2015,
                          "photos": [
                              {
                                  "_id": "60910625e1c0d2bb8e312638",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-60910625e1c0d2bb8e312637.png"
                              }
                          ],
                          "updatedAt": "2021-06-01T08:04:27.339Z",
                          "createdAt": "2021-05-04T08:30:29.054Z",
                          "__v": 1
                      },
                      "supply_price": 1999,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-10T09:50:13.910Z",
                      "createdAt": "2021-05-10T09:50:13.331Z",
                      "__v": 0
                  },
                  "quantity": 2000
              }
          ],
          "spare_part": {
              "description": {
                  "fit_note": "Hinge Assy-Trunk Lid, LH"
              },
              "showcase": false,
              "active": true,
              "_id": "60910625e1c0d2bb8e312637",
              "name": "Hinge Assy-Trunk Lid, LH",
              "part_code": "79210-1R000",
              "part_number": "79210",
              "sub_category": {
                  "_id": "60904968e1c0d2bb8e312634",
                  "sub_category": {
                      "_id": "609043c2e1c0d2bb8e312632",
                      "name": "Cowl Panel",
                      "description": "Cowl Panel",
                      "category": {
                          "_id": "609042b3e1c0d2bb8e31262e",
                          "name": "Body",
                          "description": "bodyyy",
                          "updatedAt": "2021-05-10T18:48:57.315Z",
                          "createdAt": "2021-05-03T18:36:35.879Z",
                          "__v": 0
                      },
                      "updatedAt": "2021-05-03T18:41:06.473Z",
                      "createdAt": "2021-05-03T18:41:06.473Z",
                      "__v": 0
                  },
                  "model": "609041afe1c0d2bb8e31262c",
                  "updatedAt": "2021-05-03T19:05:12.365Z",
                  "createdAt": "2021-05-03T19:05:12.365Z",
                  "__v": 0
              },
              "release_year": 2015,
              "photos": [
                  {
                      "_id": "60910625e1c0d2bb8e312638",
                      "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-60910625e1c0d2bb8e312637.png"
                  }
              ],
              "updatedAt": "2021-06-01T08:04:27.339Z",
              "createdAt": "2021-05-04T08:30:29.054Z",
              "__v": 1
          },
          "current_quantity": 0,
          "updatedAt": "2021-05-10T09:50:14.580Z",
          "createdAt": "2021-05-04T13:16:58.363Z",
          "__v": 0
      },
      "unit_price": 10000,
      "quantity": 2000,
      "month": 4,
      "year": 2021,
      "day": 10,
      "week": 2,
      "updatedAt": "2021-05-10T09:50:14.597Z",
      "createdAt": "2021-05-10T09:50:14.597Z",
      "__v": 0,
      "imageUrls": [
          "http://104.236.61.92:4008/api/files/load/%2Fopt%2FKOREA-AUTO-RWANDA%2Fimages%2Fspare-parts%2Fspare-part-60910625e1c0d2bb8e312637.png"
      ]
  },
  {
      "active": true,
      "_id": "609901d65e503f9f8cec5b6b",
      "part_in_stock": {
          "active": true,
          "_id": "6091494a852056c613ad3b77",
          "supplies": [
              {
                  "createdAt": "2021-05-04T12:49:49.795Z",
                  "_id": "6091494a852056c613ad3b78",
                  "supplied_part": {
                      "active": true,
                      "_id": "60914949852056c613ad3b74",
                      "part_supply": {
                          "supply_price": 30003000,
                          "active": true,
                          "_id": "60914948852056c613ad3b73",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "1620134120001",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-04T13:16:57.793Z",
                          "createdAt": "2021-05-04T13:16:56.909Z",
                          "__v": 0
                      },
                      "quantity": 3000,
                      "spare_part": null,
                      "supply_price": 3000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-04T13:16:58.233Z",
                      "createdAt": "2021-05-04T13:16:57.519Z",
                      "__v": 0
                  },
                  "quantity": 3000
              },
              {
                  "createdAt": "2021-05-09T12:55:23.163Z",
                  "_id": "6098d5d72824672c1d2ae0c2",
                  "supplied_part": {
                      "active": true,
                      "_id": "6098d5d72824672c1d2ae0be",
                      "part_supply": {
                          "supply_price": 20004000,
                          "active": true,
                          "_id": "6098d5d62824672c1d2ae0bc",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "1620628773933",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-10T06:42:31.324Z",
                          "createdAt": "2021-05-10T06:42:30.551Z",
                          "__v": 0
                      },
                      "quantity": 200,
                      "spare_part": null,
                      "supply_price": 4000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-10T06:42:31.833Z",
                      "createdAt": "2021-05-10T06:42:31.320Z",
                      "__v": 0
                  },
                  "quantity": 200
              },
              {
                  "createdAt": "2021-05-09T12:55:23.163Z",
                  "_id": "6098d60c2824672c1d2ae0ce",
                  "supplied_part": {
                      "active": true,
                      "_id": "6098d60b2824672c1d2ae0c9",
                      "part_supply": {
                          "supply_price": 20004000,
                          "active": true,
                          "_id": "6098d60a2824672c1d2ae0c7",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "1620628773933",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-10T06:43:23.614Z",
                          "createdAt": "2021-05-10T06:43:22.865Z",
                          "__v": 0
                      },
                      "quantity": 200,
                      "spare_part": null,
                      "supply_price": 4000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-10T06:43:24.145Z",
                      "createdAt": "2021-05-10T06:43:23.610Z",
                      "__v": 0
                  },
                  "quantity": 200
              },
              {
                  "createdAt": "2021-05-09T12:55:23.163Z",
                  "_id": "6098d8802824672c1d2ae0d7",
                  "supplied_part": {
                      "active": true,
                      "_id": "6098d87f2824672c1d2ae0d5",
                      "part_supply": {
                          "supply_price": 2000,
                          "active": true,
                          "_id": "6098d87f2824672c1d2ae0d4",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "1620628773933",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-10T06:53:51.687Z",
                          "createdAt": "2021-05-10T06:53:51.121Z",
                          "__v": 0
                      },
                      "quantity": 200,
                      "spare_part": null,
                      "supply_price": 4000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-10T06:53:52.207Z",
                      "createdAt": "2021-05-10T06:53:51.658Z",
                      "__v": 0
                  },
                  "quantity": 200
              },
              {
                  "createdAt": "2021-05-09T12:55:23.163Z",
                  "_id": "6098d8862824672c1d2ae0e6",
                  "supplied_part": {
                      "active": true,
                      "_id": "6098d8862824672c1d2ae0e5",
                      "part_supply": {
                          "supply_price": 20004000,
                          "active": true,
                          "_id": "6098d8852824672c1d2ae0e3",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "1620628773933",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-10T06:53:58.484Z",
                          "createdAt": "2021-05-10T06:53:57.675Z",
                          "__v": 0
                      },
                      "quantity": 200,
                      "spare_part": null,
                      "supply_price": 4000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-10T06:53:58.820Z",
                      "createdAt": "2021-05-10T06:53:58.477Z",
                      "__v": 0
                  },
                  "quantity": 200
              },
              {
                  "createdAt": "2021-05-10T07:20:37.871Z",
                  "_id": "609901d55e503f9f8cec5b5c",
                  "supplied_part": {
                      "active": true,
                      "_id": "609901d55e503f9f8cec5b5a",
                      "part_supply": {
                          "supply_price": 19991999,
                          "active": true,
                          "_id": "609901d45e503f9f8cec5b59",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "1620640170268",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-10T09:50:13.338Z",
                          "createdAt": "2021-05-10T09:50:12.392Z",
                          "__v": 0
                      },
                      "quantity": 2000,
                      "spare_part": null,
                      "supply_price": 1999,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-10T09:50:13.904Z",
                      "createdAt": "2021-05-10T09:50:13.045Z",
                      "__v": 0
                  },
                  "quantity": 2000
              }
          ],
          "spare_part": null,
          "current_quantity": 0,
          "updatedAt": "2021-05-10T09:50:14.620Z",
          "createdAt": "2021-05-04T13:16:58.216Z",
          "__v": 0
      },
      "unit_price": 10000,
      "quantity": 2000,
      "month": 4,
      "year": 2021,
      "day": 10,
      "week": 2,
      "updatedAt": "2021-05-10T09:50:14.629Z",
      "createdAt": "2021-05-10T09:50:14.629Z",
      "__v": 0,
      "imageUrls": []
  },
  {
      "active": true,
      "_id": "609905bf5e503f9f8cec5b71",
      "part_in_stock": {
          "active": true,
          "_id": "6091494a852056c613ad3b7b",
          "supplies": [
              {
                  "createdAt": "2021-05-04T12:49:49.795Z",
                  "_id": "6091494a852056c613ad3b7c",
                  "supplied_part": {
                      "active": true,
                      "_id": "60914949852056c613ad3b76",
                      "part_supply": {
                          "supply_price": 30003000,
                          "active": true,
                          "_id": "60914948852056c613ad3b73",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "1620134120001",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-04T13:16:57.793Z",
                          "createdAt": "2021-05-04T13:16:56.909Z",
                          "__v": 0
                      },
                      "quantity": 3000,
                      "spare_part": {
                          "description": {
                              "fit_note": "Accent-body-cowl"
                          },
                          "showcase": true,
                          "active": true,
                          "_id": "6090f791e1c0d2bb8e312635",
                          "name": "Bolt",
                          "part_code": "1012AA543",
                          "part_number": "1012AA",
                          "sub_category": {
                              "_id": "60904968e1c0d2bb8e312634",
                              "sub_category": {
                                  "_id": "609043c2e1c0d2bb8e312632",
                                  "name": "Cowl Panel",
                                  "description": "Cowl Panel",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-03T18:41:06.473Z",
                                  "createdAt": "2021-05-03T18:41:06.473Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-03T19:05:12.365Z",
                              "createdAt": "2021-05-03T19:05:12.365Z",
                              "__v": 0
                          },
                          "release_year": 2001,
                          "photos": [
                              {
                                  "_id": "6090f792e1c0d2bb8e312636",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-6090f791e1c0d2bb8e312635.png"
                              },
                              {
                                  "_id": "60acc76b5c8fd2456f637bfb",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-6090f791e1c0d2bb8e312635.png"
                              },
                              {
                                  "_id": "60acc78c5c8fd2456f637bfc",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-6090f791e1c0d2bb8e312635.png"
                              },
                              {
                                  "_id": "60accafb5c8fd2456f637bfd",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-6090f791e1c0d2bb8e312635.png"
                              }
                          ],
                          "updatedAt": "2021-05-30T17:37:29.693Z",
                          "createdAt": "2021-05-04T07:28:17.572Z",
                          "__v": 4
                      },
                      "supply_price": 3000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-04T13:16:58.428Z",
                      "createdAt": "2021-05-04T13:16:57.763Z",
                      "__v": 0
                  },
                  "quantity": 3000
              },
              {
                  "createdAt": "2021-05-10T07:20:37.871Z",
                  "_id": "609905bf5e503f9f8cec5b6e",
                  "supplied_part": {
                      "active": true,
                      "_id": "609905be5e503f9f8cec5b6d",
                      "part_supply": {
                          "supply_price": 1000,
                          "active": true,
                          "_id": "609905be5e503f9f8cec5b6c",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "2021-05-10T10:06:53.102Z",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-10T10:06:54.612Z",
                          "createdAt": "2021-05-10T10:06:54.021Z",
                          "__v": 0
                      },
                      "quantity": 10,
                      "spare_part": {
                          "description": {
                              "fit_note": "Accent-body-cowl"
                          },
                          "showcase": true,
                          "active": true,
                          "_id": "6090f791e1c0d2bb8e312635",
                          "name": "Bolt",
                          "part_code": "1012AA543",
                          "part_number": "1012AA",
                          "sub_category": {
                              "_id": "60904968e1c0d2bb8e312634",
                              "sub_category": {
                                  "_id": "609043c2e1c0d2bb8e312632",
                                  "name": "Cowl Panel",
                                  "description": "Cowl Panel",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-03T18:41:06.473Z",
                                  "createdAt": "2021-05-03T18:41:06.473Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-03T19:05:12.365Z",
                              "createdAt": "2021-05-03T19:05:12.365Z",
                              "__v": 0
                          },
                          "release_year": 2001,
                          "photos": [
                              {
                                  "_id": "6090f792e1c0d2bb8e312636",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-6090f791e1c0d2bb8e312635.png"
                              },
                              {
                                  "_id": "60acc76b5c8fd2456f637bfb",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-6090f791e1c0d2bb8e312635.png"
                              },
                              {
                                  "_id": "60acc78c5c8fd2456f637bfc",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-6090f791e1c0d2bb8e312635.png"
                              },
                              {
                                  "_id": "60accafb5c8fd2456f637bfd",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-6090f791e1c0d2bb8e312635.png"
                              }
                          ],
                          "updatedAt": "2021-05-30T17:37:29.693Z",
                          "createdAt": "2021-05-04T07:28:17.572Z",
                          "__v": 4
                      },
                      "supply_price": 1000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-10T10:06:55.223Z",
                      "createdAt": "2021-05-10T10:06:54.605Z",
                      "__v": 0
                  },
                  "quantity": 10
              },
              {
                  "createdAt": "2021-05-13T07:25:01.655Z",
                  "_id": "609d273e3e86f0fb15240a20",
                  "supplied_part": {
                      "active": true,
                      "_id": "609d273d3e86f0fb15240a1f",
                      "part_supply": {
                          "supply_price": 1000,
                          "active": true,
                          "_id": "609d273c3e86f0fb15240a1e",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "2021-05-13T13:14:08.370Z",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-13T13:18:53.571Z",
                          "createdAt": "2021-05-13T13:18:52.955Z",
                          "__v": 0
                      },
                      "quantity": 2000,
                      "spare_part": {
                          "description": {
                              "fit_note": "Accent-body-cowl"
                          },
                          "showcase": true,
                          "active": true,
                          "_id": "6090f791e1c0d2bb8e312635",
                          "name": "Bolt",
                          "part_code": "1012AA543",
                          "part_number": "1012AA",
                          "sub_category": {
                              "_id": "60904968e1c0d2bb8e312634",
                              "sub_category": {
                                  "_id": "609043c2e1c0d2bb8e312632",
                                  "name": "Cowl Panel",
                                  "description": "Cowl Panel",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-03T18:41:06.473Z",
                                  "createdAt": "2021-05-03T18:41:06.473Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-03T19:05:12.365Z",
                              "createdAt": "2021-05-03T19:05:12.365Z",
                              "__v": 0
                          },
                          "release_year": 2001,
                          "photos": [
                              {
                                  "_id": "6090f792e1c0d2bb8e312636",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-6090f791e1c0d2bb8e312635.png"
                              },
                              {
                                  "_id": "60acc76b5c8fd2456f637bfb",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-6090f791e1c0d2bb8e312635.png"
                              },
                              {
                                  "_id": "60acc78c5c8fd2456f637bfc",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-6090f791e1c0d2bb8e312635.png"
                              },
                              {
                                  "_id": "60accafb5c8fd2456f637bfd",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-6090f791e1c0d2bb8e312635.png"
                              }
                          ],
                          "updatedAt": "2021-05-30T17:37:29.693Z",
                          "createdAt": "2021-05-04T07:28:17.572Z",
                          "__v": 4
                      },
                      "supply_price": 1000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-13T13:18:54.149Z",
                      "createdAt": "2021-05-13T13:18:53.564Z",
                      "__v": 0
                  },
                  "quantity": 2000
              }
          ],
          "spare_part": {
              "description": {
                  "fit_note": "Accent-body-cowl"
              },
              "showcase": true,
              "active": true,
              "_id": "6090f791e1c0d2bb8e312635",
              "name": "Bolt",
              "part_code": "1012AA543",
              "part_number": "1012AA",
              "sub_category": {
                  "_id": "60904968e1c0d2bb8e312634",
                  "sub_category": {
                      "_id": "609043c2e1c0d2bb8e312632",
                      "name": "Cowl Panel",
                      "description": "Cowl Panel",
                      "category": {
                          "_id": "609042b3e1c0d2bb8e31262e",
                          "name": "Body",
                          "description": "bodyyy",
                          "updatedAt": "2021-05-10T18:48:57.315Z",
                          "createdAt": "2021-05-03T18:36:35.879Z",
                          "__v": 0
                      },
                      "updatedAt": "2021-05-03T18:41:06.473Z",
                      "createdAt": "2021-05-03T18:41:06.473Z",
                      "__v": 0
                  },
                  "model": "609041afe1c0d2bb8e31262c",
                  "updatedAt": "2021-05-03T19:05:12.365Z",
                  "createdAt": "2021-05-03T19:05:12.365Z",
                  "__v": 0
              },
              "release_year": 2001,
              "photos": [
                  {
                      "_id": "6090f792e1c0d2bb8e312636",
                      "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-6090f791e1c0d2bb8e312635.png"
                  },
                  {
                      "_id": "60acc76b5c8fd2456f637bfb",
                      "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-6090f791e1c0d2bb8e312635.png"
                  },
                  {
                      "_id": "60acc78c5c8fd2456f637bfc",
                      "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-6090f791e1c0d2bb8e312635.png"
                  },
                  {
                      "_id": "60accafb5c8fd2456f637bfd",
                      "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-6090f791e1c0d2bb8e312635.png"
                  }
              ],
              "updatedAt": "2021-05-30T17:37:29.693Z",
              "createdAt": "2021-05-04T07:28:17.572Z",
              "__v": 4
          },
          "current_quantity": 0,
          "updatedAt": "2021-05-13T13:18:54.697Z",
          "createdAt": "2021-05-04T13:16:58.390Z",
          "__v": 0
      },
      "unit_price": 3000,
      "quantity": 10,
      "month": 4,
      "year": 2021,
      "day": 10,
      "week": 2,
      "updatedAt": "2021-05-13T13:18:54.705Z",
      "createdAt": "2021-05-10T10:06:55.959Z",
      "__v": 0,
      "imageUrls": [
          "http://104.236.61.92:4008/api/files/load/%2Fopt%2FKOREA-AUTO-RWANDA%2Fimages%2Fspare-parts%2Fspare-part-6090f791e1c0d2bb8e312635.png",
          "http://104.236.61.92:4008/api/files/load/%2Fopt%2FKOREA-AUTO-RWANDA%2Fimages%2Fspare-parts%2Fspare-part-6090f791e1c0d2bb8e312635.png",
          "http://104.236.61.92:4008/api/files/load/%2Fopt%2FKOREA-AUTO-RWANDA%2Fimages%2Fspare-parts%2Fspare-part-6090f791e1c0d2bb8e312635.png",
          "http://104.236.61.92:4008/api/files/load/%2Fopt%2FKOREA-AUTO-RWANDA%2Fimages%2Fspare-parts%2Fspare-part-6090f791e1c0d2bb8e312635.png"
      ]
  },
  {
      "active": true,
      "_id": "609d27743e86f0fb15240a2b",
      "part_in_stock": {
          "active": true,
          "_id": "609d27743e86f0fb15240a27",
          "supplies": [
              {
                  "createdAt": "2021-05-13T07:25:01.655Z",
                  "_id": "609d27743e86f0fb15240a28",
                  "supplied_part": {
                      "active": true,
                      "_id": "609d27733e86f0fb15240a25",
                      "part_supply": {
                          "supply_price": 50001000,
                          "active": true,
                          "_id": "609d27733e86f0fb15240a24",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "2021-05-13T13:18:53.903Z",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-13T13:19:47.975Z",
                          "createdAt": "2021-05-13T13:19:47.426Z",
                          "__v": 0
                      },
                      "quantity": 2000,
                      "spare_part": {
                          "description": {
                              "fit_note": "Bolt-Flange"
                          },
                          "showcase": true,
                          "active": true,
                          "_id": "609d04903e86f0fb15240a0a",
                          "name": "Insulator-Fender LH",
                          "part_code": "84141-J0000",
                          "part_number": "84141F",
                          "sub_category": {
                              "_id": "609d03933e86f0fb15240a02",
                              "sub_category": {
                                  "_id": "609d03273e86f0fb152409fc",
                                  "name": "Fender & Hood Panel",
                                  "description": "Fender",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-13T10:44:55.922Z",
                                  "createdAt": "2021-05-13T10:44:55.922Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-13T10:46:43.180Z",
                              "createdAt": "2021-05-13T10:46:43.180Z",
                              "__v": 0
                          },
                          "release_year": 2019,
                          "photos": [
                              {
                                  "_id": "609d04913e86f0fb15240a0b",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d04903e86f0fb15240a0a.png"
                              }
                          ],
                          "updatedAt": "2021-06-01T08:04:33.991Z",
                          "createdAt": "2021-05-13T10:50:56.533Z",
                          "__v": 1
                      },
                      "supply_price": 5000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-13T13:19:48.445Z",
                      "createdAt": "2021-05-13T13:19:47.939Z",
                      "__v": 0
                  },
                  "quantity": 2000
              },
              {
                  "createdAt": "2021-05-13T07:25:01.655Z",
                  "_id": "609d28143e86f0fb15240a3e",
                  "supplied_part": {
                      "active": true,
                      "_id": "609d28123e86f0fb15240a2f",
                      "part_supply": {
                          "supply_price": 5.000010000120006e+24,
                          "active": true,
                          "_id": "609d28113e86f0fb15240a2d",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "2021-05-13T13:19:48.206Z",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-13T13:22:27.474Z",
                          "createdAt": "2021-05-13T13:22:25.587Z",
                          "__v": 0
                      },
                      "quantity": 2000,
                      "spare_part": {
                          "description": {
                              "fit_note": "Bolt-Flange"
                          },
                          "showcase": true,
                          "active": true,
                          "_id": "609d04903e86f0fb15240a0a",
                          "name": "Insulator-Fender LH",
                          "part_code": "84141-J0000",
                          "part_number": "84141F",
                          "sub_category": {
                              "_id": "609d03933e86f0fb15240a02",
                              "sub_category": {
                                  "_id": "609d03273e86f0fb152409fc",
                                  "name": "Fender & Hood Panel",
                                  "description": "Fender",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-13T10:44:55.922Z",
                                  "createdAt": "2021-05-13T10:44:55.922Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-13T10:46:43.180Z",
                              "createdAt": "2021-05-13T10:46:43.180Z",
                              "__v": 0
                          },
                          "release_year": 2019,
                          "photos": [
                              {
                                  "_id": "609d04913e86f0fb15240a0b",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d04903e86f0fb15240a0a.png"
                              }
                          ],
                          "updatedAt": "2021-06-01T08:04:33.991Z",
                          "createdAt": "2021-05-13T10:50:56.533Z",
                          "__v": 1
                      },
                      "supply_price": 5000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-13T13:22:28.638Z",
                      "createdAt": "2021-05-13T13:22:26.625Z",
                      "__v": 0
                  },
                  "quantity": 2000
              }
          ],
          "spare_part": {
              "description": {
                  "fit_note": "Bolt-Flange"
              },
              "showcase": true,
              "active": true,
              "_id": "609d04903e86f0fb15240a0a",
              "name": "Insulator-Fender LH",
              "part_code": "84141-J0000",
              "part_number": "84141F",
              "sub_category": {
                  "_id": "609d03933e86f0fb15240a02",
                  "sub_category": {
                      "_id": "609d03273e86f0fb152409fc",
                      "name": "Fender & Hood Panel",
                      "description": "Fender",
                      "category": {
                          "_id": "609042b3e1c0d2bb8e31262e",
                          "name": "Body",
                          "description": "bodyyy",
                          "updatedAt": "2021-05-10T18:48:57.315Z",
                          "createdAt": "2021-05-03T18:36:35.879Z",
                          "__v": 0
                      },
                      "updatedAt": "2021-05-13T10:44:55.922Z",
                      "createdAt": "2021-05-13T10:44:55.922Z",
                      "__v": 0
                  },
                  "model": "609041afe1c0d2bb8e31262c",
                  "updatedAt": "2021-05-13T10:46:43.180Z",
                  "createdAt": "2021-05-13T10:46:43.180Z",
                  "__v": 0
              },
              "release_year": 2019,
              "photos": [
                  {
                      "_id": "609d04913e86f0fb15240a0b",
                      "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d04903e86f0fb15240a0a.png"
                  }
              ],
              "updatedAt": "2021-06-01T08:04:33.991Z",
              "createdAt": "2021-05-13T10:50:56.533Z",
              "__v": 1
          },
          "current_quantity": 0,
          "updatedAt": "2021-05-13T13:22:29.596Z",
          "createdAt": "2021-05-13T13:19:48.439Z",
          "__v": 0
      },
      "unit_price": 10000,
      "quantity": 2000,
      "month": 4,
      "year": 2021,
      "day": 13,
      "week": 2,
      "updatedAt": "2021-05-13T13:22:29.611Z",
      "createdAt": "2021-05-13T13:19:49.001Z",
      "__v": 0,
      "imageUrls": [
          "http://104.236.61.92:4008/api/files/load/%2Fopt%2FKOREA-AUTO-RWANDA%2Fimages%2Fspare-parts%2Fspare-part-609d04903e86f0fb15240a0a.png"
      ]
  },
  {
      "active": true,
      "_id": "609d27753e86f0fb15240a2c",
      "part_in_stock": {
          "active": true,
          "_id": "609d27743e86f0fb15240a29",
          "supplies": [
              {
                  "createdAt": "2021-05-13T07:25:01.655Z",
                  "_id": "609d27743e86f0fb15240a2a",
                  "supplied_part": {
                      "active": true,
                      "_id": "609d27733e86f0fb15240a26",
                      "part_supply": {
                          "supply_price": 50001000,
                          "active": true,
                          "_id": "609d27733e86f0fb15240a24",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "2021-05-13T13:18:53.903Z",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-13T13:19:47.975Z",
                          "createdAt": "2021-05-13T13:19:47.426Z",
                          "__v": 0
                      },
                      "quantity": 2000,
                      "spare_part": {
                          "description": {
                              "fit_note": "Bolt-Flange"
                          },
                          "showcase": true,
                          "active": true,
                          "_id": "609d043d3e86f0fb15240a08",
                          "name": "Bolt-Flange",
                          "part_code": "11408-06121",
                          "part_number": "11406A",
                          "sub_category": {
                              "_id": "609d03933e86f0fb15240a02",
                              "sub_category": {
                                  "_id": "609d03273e86f0fb152409fc",
                                  "name": "Fender & Hood Panel",
                                  "description": "Fender",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-13T10:44:55.922Z",
                                  "createdAt": "2021-05-13T10:44:55.922Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-13T10:46:43.180Z",
                              "createdAt": "2021-05-13T10:46:43.180Z",
                              "__v": 0
                          },
                          "release_year": 2019,
                          "photos": [
                              {
                                  "_id": "609d043d3e86f0fb15240a09",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d043d3e86f0fb15240a08.png"
                              }
                          ],
                          "updatedAt": "2021-06-01T08:04:44.174Z",
                          "createdAt": "2021-05-13T10:49:33.119Z",
                          "__v": 1
                      },
                      "supply_price": 1000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-13T13:19:48.522Z",
                      "createdAt": "2021-05-13T13:19:47.970Z",
                      "__v": 0
                  },
                  "quantity": 2000
              },
              {
                  "createdAt": "2021-05-13T07:25:01.655Z",
                  "_id": "609d28143e86f0fb15240a3b",
                  "supplied_part": {
                      "active": true,
                      "_id": "609d28123e86f0fb15240a2e",
                      "part_supply": {
                          "supply_price": 5.000010000120006e+24,
                          "active": true,
                          "_id": "609d28113e86f0fb15240a2d",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "2021-05-13T13:19:48.206Z",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-13T13:22:27.474Z",
                          "createdAt": "2021-05-13T13:22:25.587Z",
                          "__v": 0
                      },
                      "quantity": 2000,
                      "spare_part": {
                          "description": {
                              "fit_note": "Bolt-Flange"
                          },
                          "showcase": true,
                          "active": true,
                          "_id": "609d043d3e86f0fb15240a08",
                          "name": "Bolt-Flange",
                          "part_code": "11408-06121",
                          "part_number": "11406A",
                          "sub_category": {
                              "_id": "609d03933e86f0fb15240a02",
                              "sub_category": {
                                  "_id": "609d03273e86f0fb152409fc",
                                  "name": "Fender & Hood Panel",
                                  "description": "Fender",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-13T10:44:55.922Z",
                                  "createdAt": "2021-05-13T10:44:55.922Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-13T10:46:43.180Z",
                              "createdAt": "2021-05-13T10:46:43.180Z",
                              "__v": 0
                          },
                          "release_year": 2019,
                          "photos": [
                              {
                                  "_id": "609d043d3e86f0fb15240a09",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d043d3e86f0fb15240a08.png"
                              }
                          ],
                          "updatedAt": "2021-06-01T08:04:44.174Z",
                          "createdAt": "2021-05-13T10:49:33.119Z",
                          "__v": 1
                      },
                      "supply_price": 1000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-13T13:22:28.539Z",
                      "createdAt": "2021-05-13T13:22:26.616Z",
                      "__v": 0
                  },
                  "quantity": 2000
              }
          ],
          "spare_part": {
              "description": {
                  "fit_note": "Bolt-Flange"
              },
              "showcase": true,
              "active": true,
              "_id": "609d043d3e86f0fb15240a08",
              "name": "Bolt-Flange",
              "part_code": "11408-06121",
              "part_number": "11406A",
              "sub_category": {
                  "_id": "609d03933e86f0fb15240a02",
                  "sub_category": {
                      "_id": "609d03273e86f0fb152409fc",
                      "name": "Fender & Hood Panel",
                      "description": "Fender",
                      "category": {
                          "_id": "609042b3e1c0d2bb8e31262e",
                          "name": "Body",
                          "description": "bodyyy",
                          "updatedAt": "2021-05-10T18:48:57.315Z",
                          "createdAt": "2021-05-03T18:36:35.879Z",
                          "__v": 0
                      },
                      "updatedAt": "2021-05-13T10:44:55.922Z",
                      "createdAt": "2021-05-13T10:44:55.922Z",
                      "__v": 0
                  },
                  "model": "609041afe1c0d2bb8e31262c",
                  "updatedAt": "2021-05-13T10:46:43.180Z",
                  "createdAt": "2021-05-13T10:46:43.180Z",
                  "__v": 0
              },
              "release_year": 2019,
              "photos": [
                  {
                      "_id": "609d043d3e86f0fb15240a09",
                      "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d043d3e86f0fb15240a08.png"
                  }
              ],
              "updatedAt": "2021-06-01T08:04:44.174Z",
              "createdAt": "2021-05-13T10:49:33.119Z",
              "__v": 1
          },
          "current_quantity": 0,
          "updatedAt": "2021-05-13T13:22:29.462Z",
          "createdAt": "2021-05-13T13:19:48.518Z",
          "__v": 0
      },
      "unit_price": 4000,
      "quantity": 2000,
      "month": 4,
      "year": 2021,
      "day": 13,
      "week": 2,
      "updatedAt": "2021-05-13T13:22:29.494Z",
      "createdAt": "2021-05-13T13:19:49.077Z",
      "__v": 0,
      "imageUrls": [
          "http://104.236.61.92:4008/api/files/load/%2Fopt%2FKOREA-AUTO-RWANDA%2Fimages%2Fspare-parts%2Fspare-part-609d043d3e86f0fb15240a08.png"
      ]
  },
  {
      "active": true,
      "_id": "609d28153e86f0fb15240a51",
      "part_in_stock": {
          "active": true,
          "_id": "609d28143e86f0fb15240a39",
          "supplies": [
              {
                  "createdAt": "2021-05-13T07:25:01.655Z",
                  "_id": "609d28143e86f0fb15240a3a",
                  "supplied_part": {
                      "active": true,
                      "_id": "609d28123e86f0fb15240a30",
                      "part_supply": {
                          "supply_price": 5.000010000120006e+24,
                          "active": true,
                          "_id": "609d28113e86f0fb15240a2d",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "2021-05-13T13:19:48.206Z",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-13T13:22:27.474Z",
                          "createdAt": "2021-05-13T13:22:25.587Z",
                          "__v": 0
                      },
                      "quantity": 2000,
                      "spare_part": {
                          "description": {
                              "fit_note": "Nut"
                          },
                          "showcase": false,
                          "active": true,
                          "_id": "609d04eb3e86f0fb15240a0e",
                          "name": "Panel-Fender, RH",
                          "part_code": "66321-J0000",
                          "part_number": "66321",
                          "sub_category": {
                              "_id": "609d03933e86f0fb15240a02",
                              "sub_category": {
                                  "_id": "609d03273e86f0fb152409fc",
                                  "name": "Fender & Hood Panel",
                                  "description": "Fender",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-13T10:44:55.922Z",
                                  "createdAt": "2021-05-13T10:44:55.922Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-13T10:46:43.180Z",
                              "createdAt": "2021-05-13T10:46:43.180Z",
                              "__v": 0
                          },
                          "release_year": 2019,
                          "photos": [
                              {
                                  "_id": "609d04ec3e86f0fb15240a0f",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d04eb3e86f0fb15240a0e.png"
                              }
                          ],
                          "updatedAt": "2021-05-13T10:52:28.453Z",
                          "createdAt": "2021-05-13T10:52:27.915Z",
                          "__v": 1
                      },
                      "supply_price": 50000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-13T13:22:28.117Z",
                      "createdAt": "2021-05-13T13:22:26.649Z",
                      "__v": 0
                  },
                  "quantity": 2000
              }
          ],
          "spare_part": {
              "description": {
                  "fit_note": "Nut"
              },
              "showcase": false,
              "active": true,
              "_id": "609d04eb3e86f0fb15240a0e",
              "name": "Panel-Fender, RH",
              "part_code": "66321-J0000",
              "part_number": "66321",
              "sub_category": {
                  "_id": "609d03933e86f0fb15240a02",
                  "sub_category": {
                      "_id": "609d03273e86f0fb152409fc",
                      "name": "Fender & Hood Panel",
                      "description": "Fender",
                      "category": {
                          "_id": "609042b3e1c0d2bb8e31262e",
                          "name": "Body",
                          "description": "bodyyy",
                          "updatedAt": "2021-05-10T18:48:57.315Z",
                          "createdAt": "2021-05-03T18:36:35.879Z",
                          "__v": 0
                      },
                      "updatedAt": "2021-05-13T10:44:55.922Z",
                      "createdAt": "2021-05-13T10:44:55.922Z",
                      "__v": 0
                  },
                  "model": "609041afe1c0d2bb8e31262c",
                  "updatedAt": "2021-05-13T10:46:43.180Z",
                  "createdAt": "2021-05-13T10:46:43.180Z",
                  "__v": 0
              },
              "release_year": 2019,
              "photos": [
                  {
                      "_id": "609d04ec3e86f0fb15240a0f",
                      "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d04eb3e86f0fb15240a0e.png"
                  }
              ],
              "updatedAt": "2021-05-13T10:52:28.453Z",
              "createdAt": "2021-05-13T10:52:27.915Z",
              "__v": 1
          },
          "current_quantity": 0,
          "updatedAt": "2021-05-13T13:22:29.429Z",
          "createdAt": "2021-05-13T13:22:28.108Z",
          "__v": 0
      },
      "unit_price": 100000,
      "quantity": 2000,
      "month": 4,
      "year": 2021,
      "day": 13,
      "week": 2,
      "updatedAt": "2021-05-13T13:22:29.442Z",
      "createdAt": "2021-05-13T13:22:29.442Z",
      "__v": 0,
      "imageUrls": [
          "http://104.236.61.92:4008/api/files/load/%2Fopt%2FKOREA-AUTO-RWANDA%2Fimages%2Fspare-parts%2Fspare-part-609d04eb3e86f0fb15240a0e.png"
      ]
  },
  {
      "active": true,
      "_id": "609d28153e86f0fb15240a52",
      "part_in_stock": {
          "active": true,
          "_id": "609d28143e86f0fb15240a4f",
          "supplies": [
              {
                  "createdAt": "2021-05-13T07:25:01.655Z",
                  "_id": "609d28143e86f0fb15240a50",
                  "supplied_part": {
                      "active": true,
                      "_id": "609d28133e86f0fb15240a35",
                      "part_supply": {
                          "supply_price": 5.000010000120006e+24,
                          "active": true,
                          "_id": "609d28113e86f0fb15240a2d",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "2021-05-13T13:19:48.206Z",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-13T13:22:27.474Z",
                          "createdAt": "2021-05-13T13:22:25.587Z",
                          "__v": 0
                      },
                      "quantity": 2000,
                      "spare_part": {
                          "description": {
                              "fit_note": "SMART KEY-FR DR"
                          },
                          "showcase": false,
                          "active": true,
                          "_id": "609d05b73e86f0fb15240a12",
                          "name": "Panel Assy-Front Door, RH",
                          "part_code": "76004-J0000",
                          "part_number": "76004",
                          "sub_category": {
                              "_id": "609d03973e86f0fb15240a03",
                              "sub_category": {
                                  "_id": "609d03363e86f0fb152409fd",
                                  "name": "Front Door Panel",
                                  "description": "front",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-13T10:45:10.356Z",
                                  "createdAt": "2021-05-13T10:45:10.356Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-13T10:46:47.330Z",
                              "createdAt": "2021-05-13T10:46:47.330Z",
                              "__v": 0
                          },
                          "release_year": 2019,
                          "photos": [
                              {
                                  "_id": "609d05b73e86f0fb15240a13",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d05b73e86f0fb15240a12.png"
                              }
                          ],
                          "updatedAt": "2021-05-13T10:55:51.924Z",
                          "createdAt": "2021-05-13T10:55:51.406Z",
                          "__v": 1
                      },
                      "supply_price": 10000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-13T13:22:29.013Z",
                      "createdAt": "2021-05-13T13:22:27.165Z",
                      "__v": 0
                  },
                  "quantity": 2000
              }
          ],
          "spare_part": {
              "description": {
                  "fit_note": "SMART KEY-FR DR"
              },
              "showcase": false,
              "active": true,
              "_id": "609d05b73e86f0fb15240a12",
              "name": "Panel Assy-Front Door, RH",
              "part_code": "76004-J0000",
              "part_number": "76004",
              "sub_category": {
                  "_id": "609d03973e86f0fb15240a03",
                  "sub_category": {
                      "_id": "609d03363e86f0fb152409fd",
                      "name": "Front Door Panel",
                      "description": "front",
                      "category": {
                          "_id": "609042b3e1c0d2bb8e31262e",
                          "name": "Body",
                          "description": "bodyyy",
                          "updatedAt": "2021-05-10T18:48:57.315Z",
                          "createdAt": "2021-05-03T18:36:35.879Z",
                          "__v": 0
                      },
                      "updatedAt": "2021-05-13T10:45:10.356Z",
                      "createdAt": "2021-05-13T10:45:10.356Z",
                      "__v": 0
                  },
                  "model": "609041afe1c0d2bb8e31262c",
                  "updatedAt": "2021-05-13T10:46:47.330Z",
                  "createdAt": "2021-05-13T10:46:47.330Z",
                  "__v": 0
              },
              "release_year": 2019,
              "photos": [
                  {
                      "_id": "609d05b73e86f0fb15240a13",
                      "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d05b73e86f0fb15240a12.png"
                  }
              ],
              "updatedAt": "2021-05-13T10:55:51.924Z",
              "createdAt": "2021-05-13T10:55:51.406Z",
              "__v": 1
          },
          "current_quantity": 0,
          "updatedAt": "2021-05-13T13:22:29.514Z",
          "createdAt": "2021-05-13T13:22:28.993Z",
          "__v": 0
      },
      "unit_price": 20000,
      "quantity": 2000,
      "month": 4,
      "year": 2021,
      "day": 13,
      "week": 2,
      "updatedAt": "2021-05-13T13:22:29.521Z",
      "createdAt": "2021-05-13T13:22:29.521Z",
      "__v": 0,
      "imageUrls": [
          "http://104.236.61.92:4008/api/files/load/%2Fopt%2FKOREA-AUTO-RWANDA%2Fimages%2Fspare-parts%2Fspare-part-609d05b73e86f0fb15240a12.png"
      ]
  },
  {
      "active": true,
      "_id": "609d28153e86f0fb15240a53",
      "part_in_stock": {
          "active": true,
          "_id": "609d28143e86f0fb15240a4d",
          "supplies": [
              {
                  "createdAt": "2021-05-13T07:25:01.655Z",
                  "_id": "609d28143e86f0fb15240a4e",
                  "supplied_part": {
                      "active": true,
                      "_id": "609d28133e86f0fb15240a36",
                      "part_supply": {
                          "supply_price": 5.000010000120006e+24,
                          "active": true,
                          "_id": "609d28113e86f0fb15240a2d",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "2021-05-13T13:19:48.206Z",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-13T13:22:27.474Z",
                          "createdAt": "2021-05-13T13:22:25.587Z",
                          "__v": 0
                      },
                      "quantity": 2000,
                      "spare_part": {
                          "description": {
                              "fit_note": " 205 TIRE - 205/45 R17, TEMPORARY - STEEL WHEEL & TIRE (MINI)"
                          },
                          "showcase": false,
                          "active": true,
                          "_id": "609d072c3e86f0fb15240a18",
                          "name": "Label-Tire Pressure",
                          "part_code": "05203-H9220",
                          "part_number": "05203",
                          "sub_category": {
                              "_id": "609d039c3e86f0fb15240a04",
                              "sub_category": {
                                  "_id": "609d03423e86f0fb152409fe",
                                  "name": "Label",
                                  "description": "label",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-13T10:45:22.640Z",
                                  "createdAt": "2021-05-13T10:45:22.640Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-13T10:46:52.203Z",
                              "createdAt": "2021-05-13T10:46:52.203Z",
                              "__v": 0
                          },
                          "release_year": 2019,
                          "photos": [
                              {
                                  "_id": "609d072d3e86f0fb15240a19",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d072c3e86f0fb15240a18.png"
                              }
                          ],
                          "updatedAt": "2021-05-13T11:02:05.206Z",
                          "createdAt": "2021-05-13T11:02:04.581Z",
                          "__v": 1
                      },
                      "supply_price": 12000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-13T13:22:29.005Z",
                      "createdAt": "2021-05-13T13:22:27.177Z",
                      "__v": 0
                  },
                  "quantity": 2000
              },
              {
                  "createdAt": "2021-05-23T17:34:03.232Z",
                  "_id": "60abb49f5c8fd2456f637bed",
                  "supplied_part": {
                      "active": true,
                      "_id": "60abb49f5c8fd2456f637bec",
                      "part_supply": {
                          "supply_price": 40000,
                          "active": true,
                          "_id": "60abb49e5c8fd2456f637beb",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "2021-05-24T14:13:20.530Z",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-24T14:13:51.181Z",
                          "createdAt": "2021-05-24T14:13:50.181Z",
                          "__v": 0
                      },
                      "quantity": 30,
                      "spare_part": {
                          "description": {
                              "fit_note": " 205 TIRE - 205/45 R17, TEMPORARY - STEEL WHEEL & TIRE (MINI)"
                          },
                          "showcase": false,
                          "active": true,
                          "_id": "609d072c3e86f0fb15240a18",
                          "name": "Label-Tire Pressure",
                          "part_code": "05203-H9220",
                          "part_number": "05203",
                          "sub_category": {
                              "_id": "609d039c3e86f0fb15240a04",
                              "sub_category": {
                                  "_id": "609d03423e86f0fb152409fe",
                                  "name": "Label",
                                  "description": "label",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-13T10:45:22.640Z",
                                  "createdAt": "2021-05-13T10:45:22.640Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-13T10:46:52.203Z",
                              "createdAt": "2021-05-13T10:46:52.203Z",
                              "__v": 0
                          },
                          "release_year": 2019,
                          "photos": [
                              {
                                  "_id": "609d072d3e86f0fb15240a19",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d072c3e86f0fb15240a18.png"
                              }
                          ],
                          "updatedAt": "2021-05-13T11:02:05.206Z",
                          "createdAt": "2021-05-13T11:02:04.581Z",
                          "__v": 1
                      },
                      "supply_price": 40000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-24T14:13:51.772Z",
                      "createdAt": "2021-05-24T14:13:51.174Z",
                      "__v": 0
                  },
                  "quantity": 30
              },
              {
                  "createdAt": "2021-05-23T17:34:03.232Z",
                  "_id": "60ac0ba05c8fd2456f637bf2",
                  "supplied_part": {
                      "active": true,
                      "_id": "60ac0ba05c8fd2456f637bf1",
                      "part_supply": {
                          "supply_price": 23000,
                          "active": true,
                          "_id": "60ac0b9f5c8fd2456f637bf0",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "2021-05-24T20:24:18.471Z",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-24T20:25:04.225Z",
                          "createdAt": "2021-05-24T20:25:03.689Z",
                          "__v": 0
                      },
                      "quantity": 40,
                      "spare_part": {
                          "description": {
                              "fit_note": " 205 TIRE - 205/45 R17, TEMPORARY - STEEL WHEEL & TIRE (MINI)"
                          },
                          "showcase": false,
                          "active": true,
                          "_id": "609d072c3e86f0fb15240a18",
                          "name": "Label-Tire Pressure",
                          "part_code": "05203-H9220",
                          "part_number": "05203",
                          "sub_category": {
                              "_id": "609d039c3e86f0fb15240a04",
                              "sub_category": {
                                  "_id": "609d03423e86f0fb152409fe",
                                  "name": "Label",
                                  "description": "label",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-13T10:45:22.640Z",
                                  "createdAt": "2021-05-13T10:45:22.640Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-13T10:46:52.203Z",
                              "createdAt": "2021-05-13T10:46:52.203Z",
                              "__v": 0
                          },
                          "release_year": 2019,
                          "photos": [
                              {
                                  "_id": "609d072d3e86f0fb15240a19",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d072c3e86f0fb15240a18.png"
                              }
                          ],
                          "updatedAt": "2021-05-13T11:02:05.206Z",
                          "createdAt": "2021-05-13T11:02:04.581Z",
                          "__v": 1
                      },
                      "supply_price": 23000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-24T20:25:04.792Z",
                      "createdAt": "2021-05-24T20:25:04.216Z",
                      "__v": 0
                  },
                  "quantity": 40
              }
          ],
          "spare_part": {
              "description": {
                  "fit_note": " 205 TIRE - 205/45 R17, TEMPORARY - STEEL WHEEL & TIRE (MINI)"
              },
              "showcase": false,
              "active": true,
              "_id": "609d072c3e86f0fb15240a18",
              "name": "Label-Tire Pressure",
              "part_code": "05203-H9220",
              "part_number": "05203",
              "sub_category": {
                  "_id": "609d039c3e86f0fb15240a04",
                  "sub_category": {
                      "_id": "609d03423e86f0fb152409fe",
                      "name": "Label",
                      "description": "label",
                      "category": {
                          "_id": "609042b3e1c0d2bb8e31262e",
                          "name": "Body",
                          "description": "bodyyy",
                          "updatedAt": "2021-05-10T18:48:57.315Z",
                          "createdAt": "2021-05-03T18:36:35.879Z",
                          "__v": 0
                      },
                      "updatedAt": "2021-05-13T10:45:22.640Z",
                      "createdAt": "2021-05-13T10:45:22.640Z",
                      "__v": 0
                  },
                  "model": "609041afe1c0d2bb8e31262c",
                  "updatedAt": "2021-05-13T10:46:52.203Z",
                  "createdAt": "2021-05-13T10:46:52.203Z",
                  "__v": 0
              },
              "release_year": 2019,
              "photos": [
                  {
                      "_id": "609d072d3e86f0fb15240a19",
                      "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d072c3e86f0fb15240a18.png"
                  }
              ],
              "updatedAt": "2021-05-13T11:02:05.206Z",
              "createdAt": "2021-05-13T11:02:04.581Z",
              "__v": 1
          },
          "current_quantity": 0,
          "updatedAt": "2021-05-24T20:25:05.314Z",
          "createdAt": "2021-05-13T13:22:28.975Z",
          "__v": 0
      },
      "unit_price": 120000,
      "quantity": 2000,
      "month": 4,
      "year": 2021,
      "day": 13,
      "week": 2,
      "updatedAt": "2021-05-24T20:25:05.325Z",
      "createdAt": "2021-05-13T13:22:29.605Z",
      "__v": 0,
      "imageUrls": [
          "http://104.236.61.92:4008/api/files/load/%2Fopt%2FKOREA-AUTO-RWANDA%2Fimages%2Fspare-parts%2Fspare-part-609d072c3e86f0fb15240a18.png"
      ]
  },
  {
      "active": true,
      "_id": "609d28153e86f0fb15240a54",
      "part_in_stock": {
          "active": true,
          "_id": "609d28143e86f0fb15240a4b",
          "supplies": [
              {
                  "createdAt": "2021-05-13T07:25:01.655Z",
                  "_id": "609d28143e86f0fb15240a4c",
                  "supplied_part": {
                      "active": true,
                      "_id": "609d28133e86f0fb15240a33",
                      "part_supply": {
                          "supply_price": 5.000010000120006e+24,
                          "active": true,
                          "_id": "609d28113e86f0fb15240a2d",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "2021-05-13T13:19:48.206Z",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-13T13:22:27.474Z",
                          "createdAt": "2021-05-13T13:22:25.587Z",
                          "__v": 0
                      },
                      "quantity": 2000,
                      "spare_part": {
                          "description": {
                              "fit_note": "SMART KEY-FR DR"
                          },
                          "showcase": false,
                          "active": true,
                          "_id": "609d05ec3e86f0fb15240a14",
                          "name": "Panel-Front Door Outer, RH",
                          "part_code": "76121-F9000",
                          "part_number": "76121",
                          "sub_category": {
                              "_id": "609d03973e86f0fb15240a03",
                              "sub_category": {
                                  "_id": "609d03363e86f0fb152409fd",
                                  "name": "Front Door Panel",
                                  "description": "front",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-13T10:45:10.356Z",
                                  "createdAt": "2021-05-13T10:45:10.356Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-13T10:46:47.330Z",
                              "createdAt": "2021-05-13T10:46:47.330Z",
                              "__v": 0
                          },
                          "release_year": 2019,
                          "photos": [
                              {
                                  "_id": "609d05ed3e86f0fb15240a15",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d05ec3e86f0fb15240a14.png"
                              }
                          ],
                          "updatedAt": "2021-05-13T10:56:45.122Z",
                          "createdAt": "2021-05-13T10:56:44.475Z",
                          "__v": 1
                      },
                      "supply_price": 12000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-13T13:22:28.981Z",
                      "createdAt": "2021-05-13T13:22:27.154Z",
                      "__v": 0
                  },
                  "quantity": 2000
              }
          ],
          "spare_part": {
              "description": {
                  "fit_note": "SMART KEY-FR DR"
              },
              "showcase": false,
              "active": true,
              "_id": "609d05ec3e86f0fb15240a14",
              "name": "Panel-Front Door Outer, RH",
              "part_code": "76121-F9000",
              "part_number": "76121",
              "sub_category": {
                  "_id": "609d03973e86f0fb15240a03",
                  "sub_category": {
                      "_id": "609d03363e86f0fb152409fd",
                      "name": "Front Door Panel",
                      "description": "front",
                      "category": {
                          "_id": "609042b3e1c0d2bb8e31262e",
                          "name": "Body",
                          "description": "bodyyy",
                          "updatedAt": "2021-05-10T18:48:57.315Z",
                          "createdAt": "2021-05-03T18:36:35.879Z",
                          "__v": 0
                      },
                      "updatedAt": "2021-05-13T10:45:10.356Z",
                      "createdAt": "2021-05-13T10:45:10.356Z",
                      "__v": 0
                  },
                  "model": "609041afe1c0d2bb8e31262c",
                  "updatedAt": "2021-05-13T10:46:47.330Z",
                  "createdAt": "2021-05-13T10:46:47.330Z",
                  "__v": 0
              },
              "release_year": 2019,
              "photos": [
                  {
                      "_id": "609d05ed3e86f0fb15240a15",
                      "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d05ec3e86f0fb15240a14.png"
                  }
              ],
              "updatedAt": "2021-05-13T10:56:45.122Z",
              "createdAt": "2021-05-13T10:56:44.475Z",
              "__v": 1
          },
          "current_quantity": 0,
          "updatedAt": "2021-05-13T13:22:29.592Z",
          "createdAt": "2021-05-13T13:22:28.956Z",
          "__v": 0
      },
      "unit_price": 120000,
      "quantity": 2000,
      "month": 4,
      "year": 2021,
      "day": 13,
      "week": 2,
      "updatedAt": "2021-05-13T13:22:29.609Z",
      "createdAt": "2021-05-13T13:22:29.609Z",
      "__v": 0,
      "imageUrls": [
          "http://104.236.61.92:4008/api/files/load/%2Fopt%2FKOREA-AUTO-RWANDA%2Fimages%2Fspare-parts%2Fspare-part-609d05ec3e86f0fb15240a14.png"
      ]
  },
  {
      "active": true,
      "_id": "609d28153e86f0fb15240a55",
      "part_in_stock": {
          "active": true,
          "_id": "609d28143e86f0fb15240a41",
          "supplies": [
              {
                  "createdAt": "2021-05-13T07:25:01.655Z",
                  "_id": "609d28143e86f0fb15240a42",
                  "supplied_part": {
                      "active": true,
                      "_id": "609d28133e86f0fb15240a31",
                      "part_supply": {
                          "supply_price": 5.000010000120006e+24,
                          "active": true,
                          "_id": "609d28113e86f0fb15240a2d",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "2021-05-13T13:19:48.206Z",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-13T13:22:27.474Z",
                          "createdAt": "2021-05-13T13:22:25.587Z",
                          "__v": 0
                      },
                      "quantity": 2000,
                      "spare_part": {
                          "description": {
                              "fit_note": "Hinge Assy-Door Lower, LH"
                          },
                          "showcase": false,
                          "active": true,
                          "_id": "609d057c3e86f0fb15240a10",
                          "name": "Hinge Assy-Door Lower, LH",
                          "part_code": "79315-1Y000",
                          "part_number": "79330B",
                          "sub_category": {
                              "_id": "609d03973e86f0fb15240a03",
                              "sub_category": {
                                  "_id": "609d03363e86f0fb152409fd",
                                  "name": "Front Door Panel",
                                  "description": "front",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-13T10:45:10.356Z",
                                  "createdAt": "2021-05-13T10:45:10.356Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-13T10:46:47.330Z",
                              "createdAt": "2021-05-13T10:46:47.330Z",
                              "__v": 0
                          },
                          "release_year": 2019,
                          "photos": [
                              {
                                  "_id": "609d057d3e86f0fb15240a11",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d057c3e86f0fb15240a10.png"
                              }
                          ],
                          "updatedAt": "2021-05-13T10:54:53.370Z",
                          "createdAt": "2021-05-13T10:54:52.734Z",
                          "__v": 1
                      },
                      "supply_price": 10000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-13T13:22:28.641Z",
                      "createdAt": "2021-05-13T13:22:27.097Z",
                      "__v": 0
                  },
                  "quantity": 2000
              }
          ],
          "spare_part": {
              "description": {
                  "fit_note": "Hinge Assy-Door Lower, LH"
              },
              "showcase": false,
              "active": true,
              "_id": "609d057c3e86f0fb15240a10",
              "name": "Hinge Assy-Door Lower, LH",
              "part_code": "79315-1Y000",
              "part_number": "79330B",
              "sub_category": {
                  "_id": "609d03973e86f0fb15240a03",
                  "sub_category": {
                      "_id": "609d03363e86f0fb152409fd",
                      "name": "Front Door Panel",
                      "description": "front",
                      "category": {
                          "_id": "609042b3e1c0d2bb8e31262e",
                          "name": "Body",
                          "description": "bodyyy",
                          "updatedAt": "2021-05-10T18:48:57.315Z",
                          "createdAt": "2021-05-03T18:36:35.879Z",
                          "__v": 0
                      },
                      "updatedAt": "2021-05-13T10:45:10.356Z",
                      "createdAt": "2021-05-13T10:45:10.356Z",
                      "__v": 0
                  },
                  "model": "609041afe1c0d2bb8e31262c",
                  "updatedAt": "2021-05-13T10:46:47.330Z",
                  "createdAt": "2021-05-13T10:46:47.330Z",
                  "__v": 0
              },
              "release_year": 2019,
              "photos": [
                  {
                      "_id": "609d057d3e86f0fb15240a11",
                      "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d057c3e86f0fb15240a10.png"
                  }
              ],
              "updatedAt": "2021-05-13T10:54:53.370Z",
              "createdAt": "2021-05-13T10:54:52.734Z",
              "__v": 1
          },
          "current_quantity": 0,
          "updatedAt": "2021-05-13T13:22:29.716Z",
          "createdAt": "2021-05-13T13:22:28.624Z",
          "__v": 0
      },
      "unit_price": 20000,
      "quantity": 2000,
      "month": 4,
      "year": 2021,
      "day": 13,
      "week": 2,
      "updatedAt": "2021-05-13T13:22:29.725Z",
      "createdAt": "2021-05-13T13:22:29.725Z",
      "__v": 0,
      "imageUrls": [
          "http://104.236.61.92:4008/api/files/load/%2Fopt%2FKOREA-AUTO-RWANDA%2Fimages%2Fspare-parts%2Fspare-part-609d057c3e86f0fb15240a10.png"
      ]
  },
  {
      "active": true,
      "_id": "609d28153e86f0fb15240a56",
      "part_in_stock": {
          "active": true,
          "_id": "609d28143e86f0fb15240a43",
          "supplies": [
              {
                  "createdAt": "2021-05-13T07:25:01.655Z",
                  "_id": "609d28143e86f0fb15240a44",
                  "supplied_part": {
                      "active": true,
                      "_id": "609d28133e86f0fb15240a32",
                      "part_supply": {
                          "supply_price": 5.000010000120006e+24,
                          "active": true,
                          "_id": "609d28113e86f0fb15240a2d",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "2021-05-13T13:19:48.206Z",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-13T13:22:27.474Z",
                          "createdAt": "2021-05-13T13:22:25.587Z",
                          "__v": 0
                      },
                      "quantity": 2000,
                      "spare_part": {
                          "description": {
                              "fit_note": " MODEL YEAR PACKAGE - 19MY, EMISSION REGULATION - LEV-3 ULEV 125"
                          },
                          "showcase": false,
                          "active": true,
                          "_id": "609d06253e86f0fb15240a16",
                          "name": "Label-Emission",
                          "part_code": " 32450-2BHC7",
                          "part_number": "32402",
                          "sub_category": {
                              "_id": "609d039c3e86f0fb15240a04",
                              "sub_category": {
                                  "_id": "609d03423e86f0fb152409fe",
                                  "name": "Label",
                                  "description": "label",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-13T10:45:22.640Z",
                                  "createdAt": "2021-05-13T10:45:22.640Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-13T10:46:52.203Z",
                              "createdAt": "2021-05-13T10:46:52.203Z",
                              "__v": 0
                          },
                          "release_year": 2019,
                          "photos": [
                              {
                                  "_id": "609d06253e86f0fb15240a17",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d06253e86f0fb15240a16.png"
                              }
                          ],
                          "updatedAt": "2021-05-13T10:57:41.592Z",
                          "createdAt": "2021-05-13T10:57:41.027Z",
                          "__v": 1
                      },
                      "supply_price": 12000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-13T13:22:28.647Z",
                      "createdAt": "2021-05-13T13:22:27.133Z",
                      "__v": 0
                  },
                  "quantity": 2000
              }
          ],
          "spare_part": {
              "description": {
                  "fit_note": " MODEL YEAR PACKAGE - 19MY, EMISSION REGULATION - LEV-3 ULEV 125"
              },
              "showcase": false,
              "active": true,
              "_id": "609d06253e86f0fb15240a16",
              "name": "Label-Emission",
              "part_code": " 32450-2BHC7",
              "part_number": "32402",
              "sub_category": {
                  "_id": "609d039c3e86f0fb15240a04",
                  "sub_category": {
                      "_id": "609d03423e86f0fb152409fe",
                      "name": "Label",
                      "description": "label",
                      "category": {
                          "_id": "609042b3e1c0d2bb8e31262e",
                          "name": "Body",
                          "description": "bodyyy",
                          "updatedAt": "2021-05-10T18:48:57.315Z",
                          "createdAt": "2021-05-03T18:36:35.879Z",
                          "__v": 0
                      },
                      "updatedAt": "2021-05-13T10:45:22.640Z",
                      "createdAt": "2021-05-13T10:45:22.640Z",
                      "__v": 0
                  },
                  "model": "609041afe1c0d2bb8e31262c",
                  "updatedAt": "2021-05-13T10:46:52.203Z",
                  "createdAt": "2021-05-13T10:46:52.203Z",
                  "__v": 0
              },
              "release_year": 2019,
              "photos": [
                  {
                      "_id": "609d06253e86f0fb15240a17",
                      "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d06253e86f0fb15240a16.png"
                  }
              ],
              "updatedAt": "2021-05-13T10:57:41.592Z",
              "createdAt": "2021-05-13T10:57:41.027Z",
              "__v": 1
          },
          "current_quantity": 0,
          "updatedAt": "2021-05-13T13:22:29.839Z",
          "createdAt": "2021-05-13T13:22:28.630Z",
          "__v": 0
      },
      "unit_price": 120000,
      "quantity": 2000,
      "month": 4,
      "year": 2021,
      "day": 13,
      "week": 2,
      "updatedAt": "2021-05-13T13:22:29.854Z",
      "createdAt": "2021-05-13T13:22:29.854Z",
      "__v": 0,
      "imageUrls": [
          "http://104.236.61.92:4008/api/files/load/%2Fopt%2FKOREA-AUTO-RWANDA%2Fimages%2Fspare-parts%2Fspare-part-609d06253e86f0fb15240a16.png"
      ]
  },
  {
      "active": true,
      "_id": "609d28153e86f0fb15240a57",
      "part_in_stock": {
          "active": true,
          "_id": "609d28143e86f0fb15240a45",
          "supplies": [
              {
                  "createdAt": "2021-05-13T07:25:01.655Z",
                  "_id": "609d28143e86f0fb15240a46",
                  "supplied_part": {
                      "active": true,
                      "_id": "609d28133e86f0fb15240a37",
                      "part_supply": {
                          "supply_price": 5.000010000120006e+24,
                          "active": true,
                          "_id": "609d28113e86f0fb15240a2d",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "2021-05-13T13:19:48.206Z",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-13T13:22:27.474Z",
                          "createdAt": "2021-05-13T13:22:25.587Z",
                          "__v": 0
                      },
                      "quantity": 2000,
                      "spare_part": {
                          "description": {
                              "fit_note": "EMISSION REGULATION - LEV-3 ULEV 125 EMISSION REGULATION - LEV"
                          },
                          "showcase": false,
                          "active": true,
                          "_id": "609d08723e86f0fb15240a1c",
                          "name": "Label-Emission Control",
                          "part_code": "32450-2BHC0",
                          "part_number": "32450",
                          "sub_category": {
                              "_id": "609d039c3e86f0fb15240a04",
                              "sub_category": {
                                  "_id": "609d03423e86f0fb152409fe",
                                  "name": "Label",
                                  "description": "label",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-13T10:45:22.640Z",
                                  "createdAt": "2021-05-13T10:45:22.640Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-13T10:46:52.203Z",
                              "createdAt": "2021-05-13T10:46:52.203Z",
                              "__v": 0
                          },
                          "release_year": 2019,
                          "photos": [
                              {
                                  "_id": "609d08733e86f0fb15240a1d",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d08723e86f0fb15240a1c.png"
                              }
                          ],
                          "updatedAt": "2021-05-13T11:07:31.356Z",
                          "createdAt": "2021-05-13T11:07:30.775Z",
                          "__v": 1
                      },
                      "supply_price": 60000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-13T13:22:28.658Z",
                      "createdAt": "2021-05-13T13:22:27.366Z",
                      "__v": 0
                  },
                  "quantity": 2000
              }
          ],
          "spare_part": {
              "description": {
                  "fit_note": "EMISSION REGULATION - LEV-3 ULEV 125 EMISSION REGULATION - LEV"
              },
              "showcase": false,
              "active": true,
              "_id": "609d08723e86f0fb15240a1c",
              "name": "Label-Emission Control",
              "part_code": "32450-2BHC0",
              "part_number": "32450",
              "sub_category": {
                  "_id": "609d039c3e86f0fb15240a04",
                  "sub_category": {
                      "_id": "609d03423e86f0fb152409fe",
                      "name": "Label",
                      "description": "label",
                      "category": {
                          "_id": "609042b3e1c0d2bb8e31262e",
                          "name": "Body",
                          "description": "bodyyy",
                          "updatedAt": "2021-05-10T18:48:57.315Z",
                          "createdAt": "2021-05-03T18:36:35.879Z",
                          "__v": 0
                      },
                      "updatedAt": "2021-05-13T10:45:22.640Z",
                      "createdAt": "2021-05-13T10:45:22.640Z",
                      "__v": 0
                  },
                  "model": "609041afe1c0d2bb8e31262c",
                  "updatedAt": "2021-05-13T10:46:52.203Z",
                  "createdAt": "2021-05-13T10:46:52.203Z",
                  "__v": 0
              },
              "release_year": 2019,
              "photos": [
                  {
                      "_id": "609d08733e86f0fb15240a1d",
                      "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d08723e86f0fb15240a1c.png"
                  }
              ],
              "updatedAt": "2021-05-13T11:07:31.356Z",
              "createdAt": "2021-05-13T11:07:30.775Z",
              "__v": 1
          },
          "current_quantity": 0,
          "updatedAt": "2021-05-13T13:22:29.858Z",
          "createdAt": "2021-05-13T13:22:28.644Z",
          "__v": 0
      },
      "unit_price": 120000,
      "quantity": 2000,
      "month": 4,
      "year": 2021,
      "day": 13,
      "week": 2,
      "updatedAt": "2021-05-13T13:22:29.870Z",
      "createdAt": "2021-05-13T13:22:29.870Z",
      "__v": 0,
      "imageUrls": [
          "http://104.236.61.92:4008/api/files/load/%2Fopt%2FKOREA-AUTO-RWANDA%2Fimages%2Fspare-parts%2Fspare-part-609d08723e86f0fb15240a1c.png"
      ]
  },
  {
      "active": true,
      "_id": "609d28153e86f0fb15240a58",
      "part_in_stock": {
          "active": true,
          "_id": "609d28143e86f0fb15240a47",
          "supplies": [
              {
                  "createdAt": "2021-05-13T07:25:01.655Z",
                  "_id": "609d28143e86f0fb15240a48",
                  "supplied_part": {
                      "active": true,
                      "_id": "609d28133e86f0fb15240a38",
                      "part_supply": {
                          "supply_price": 5.000010000120006e+24,
                          "active": true,
                          "_id": "609d28113e86f0fb15240a2d",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "2021-05-13T13:19:48.206Z",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-13T13:22:27.474Z",
                          "createdAt": "2021-05-13T13:22:25.587Z",
                          "__v": 0
                      },
                      "quantity": 2000,
                      "spare_part": {
                          "description": {
                              "fit_note": " FR COOLER - FULL AUTO A/CON, REFRIGERATOR - ALTERNATIVE FR COOLER - MANUAL A/CON, REFRIGERATOR - ALTERNATIVE"
                          },
                          "showcase": false,
                          "active": true,
                          "_id": "609d07c93e86f0fb15240a1a",
                          "name": "Label-Refrigerant",
                          "part_code": "7699-J0100",
                          "part_number": "97699A",
                          "sub_category": {
                              "_id": "609d039c3e86f0fb15240a04",
                              "sub_category": {
                                  "_id": "609d03423e86f0fb152409fe",
                                  "name": "Label",
                                  "description": "label",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-13T10:45:22.640Z",
                                  "createdAt": "2021-05-13T10:45:22.640Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-13T10:46:52.203Z",
                              "createdAt": "2021-05-13T10:46:52.203Z",
                              "__v": 0
                          },
                          "release_year": 2019,
                          "photos": [
                              {
                                  "_id": "609d07c93e86f0fb15240a1b",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d07c93e86f0fb15240a1a.png"
                              }
                          ],
                          "updatedAt": "2021-05-13T11:04:41.892Z",
                          "createdAt": "2021-05-13T11:04:41.317Z",
                          "__v": 1
                      },
                      "supply_price": 12000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-13T13:22:28.662Z",
                      "createdAt": "2021-05-13T13:22:27.465Z",
                      "__v": 0
                  },
                  "quantity": 2000
              }
          ],
          "spare_part": {
              "description": {
                  "fit_note": " FR COOLER - FULL AUTO A/CON, REFRIGERATOR - ALTERNATIVE FR COOLER - MANUAL A/CON, REFRIGERATOR - ALTERNATIVE"
              },
              "showcase": false,
              "active": true,
              "_id": "609d07c93e86f0fb15240a1a",
              "name": "Label-Refrigerant",
              "part_code": "7699-J0100",
              "part_number": "97699A",
              "sub_category": {
                  "_id": "609d039c3e86f0fb15240a04",
                  "sub_category": {
                      "_id": "609d03423e86f0fb152409fe",
                      "name": "Label",
                      "description": "label",
                      "category": {
                          "_id": "609042b3e1c0d2bb8e31262e",
                          "name": "Body",
                          "description": "bodyyy",
                          "updatedAt": "2021-05-10T18:48:57.315Z",
                          "createdAt": "2021-05-03T18:36:35.879Z",
                          "__v": 0
                      },
                      "updatedAt": "2021-05-13T10:45:22.640Z",
                      "createdAt": "2021-05-13T10:45:22.640Z",
                      "__v": 0
                  },
                  "model": "609041afe1c0d2bb8e31262c",
                  "updatedAt": "2021-05-13T10:46:52.203Z",
                  "createdAt": "2021-05-13T10:46:52.203Z",
                  "__v": 0
              },
              "release_year": 2019,
              "photos": [
                  {
                      "_id": "609d07c93e86f0fb15240a1b",
                      "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d07c93e86f0fb15240a1a.png"
                  }
              ],
              "updatedAt": "2021-05-13T11:04:41.892Z",
              "createdAt": "2021-05-13T11:04:41.317Z",
              "__v": 1
          },
          "current_quantity": 0,
          "updatedAt": "2021-05-13T13:22:29.917Z",
          "createdAt": "2021-05-13T13:22:28.655Z",
          "__v": 0
      },
      "unit_price": 120000,
      "quantity": 2000,
      "month": 4,
      "year": 2021,
      "day": 13,
      "week": 2,
      "updatedAt": "2021-05-13T13:22:29.928Z",
      "createdAt": "2021-05-13T13:22:29.928Z",
      "__v": 0,
      "imageUrls": [
          "http://104.236.61.92:4008/api/files/load/%2Fopt%2FKOREA-AUTO-RWANDA%2Fimages%2Fspare-parts%2Fspare-part-609d07c93e86f0fb15240a1a.png"
      ]
  },
  {
      "active": true,
      "_id": "609d28153e86f0fb15240a59",
      "part_in_stock": {
          "active": true,
          "_id": "609d28143e86f0fb15240a49",
          "supplies": [
              {
                  "createdAt": "2021-05-13T07:25:01.655Z",
                  "_id": "609d28143e86f0fb15240a4a",
                  "supplied_part": {
                      "active": true,
                      "_id": "609d28133e86f0fb15240a34",
                      "part_supply": {
                          "supply_price": 5.000010000120006e+24,
                          "active": true,
                          "_id": "609d28113e86f0fb15240a2d",
                          "supplier": {
                              "status": "ACTIVE",
                              "_id": "6088710f0ab4d315fbe20524",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "6088710f0ab4d315fbe20523",
                                  "username": "supplier",
                                  "email": "supplier@gmail.com",
                                  "firstName": "supplier",
                                  "lastName": "User",
                                  "phone": "0788851401",
                                  "category": "60886c2b0ab4d315fbe2051f",
                                  "gender": "MALE",
                                  "password": "$2a$10$VcvxBCoSk1wQ814DaRgzJuLXAN15wxG8ARlMmJ17N6eZEZc6ig5.C",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-04-27T20:16:15.758Z",
                                  "createdAt": "2021-04-27T20:16:15.758Z",
                                  "__v": 0
                              },
                              "address": "Kigali",
                              "updatedAt": "2021-04-27T20:16:15.773Z",
                              "createdAt": "2021-04-27T20:16:15.773Z",
                              "__v": 0
                          },
                          "supply_date": "2021-05-13T13:19:48.206Z",
                          "reciever": {
                              "status": "ACTIVE",
                              "_id": "608874440ab4d315fbe2052a",
                              "user": {
                                  "status": "ACTIVE",
                                  "_id": "608874440ab4d315fbe20529",
                                  "username": "sales_manager",
                                  "email": "salesmanager@gmail.com",
                                  "firstName": "Gahigima",
                                  "lastName": "Emmanuel",
                                  "phone": "0788851000",
                                  "category": "60886c0d0ab4d315fbe2051d",
                                  "gender": "MALE",
                                  "password": "$2a$10$AtGm516z3bZt2/Nfjnz1meHd9u53nWngq9FtmVZtxfmoEj0v5kDWG",
                                  "profile": "/opt/KOREA-AUTO-RWANDA/images/user-profiles/user-608874440ab4d315fbe20529.jfif",
                                  "month": 3,
                                  "year": 2021,
                                  "day": 27,
                                  "week": 4,
                                  "updatedAt": "2021-06-01T09:45:07.762Z",
                                  "createdAt": "2021-04-27T20:29:56.646Z",
                                  "__v": 0
                              },
                              "nationalId": "1111111111111111",
                              "employeeCategory": "608872d70ab4d315fbe20526",
                              "updatedAt": "2021-04-27T20:29:56.677Z",
                              "createdAt": "2021-04-27T20:29:56.677Z",
                              "__v": 0
                          },
                          "updatedAt": "2021-05-13T13:22:27.474Z",
                          "createdAt": "2021-05-13T13:22:25.587Z",
                          "__v": 0
                      },
                      "quantity": 2000,
                      "spare_part": {
                          "description": {
                              "fit_note": "Nut"
                          },
                          "showcase": false,
                          "active": true,
                          "_id": "609d04c33e86f0fb15240a0c",
                          "name": "Nut",
                          "part_code": "28116-22000",
                          "part_number": "28116A",
                          "sub_category": {
                              "_id": "609d03933e86f0fb15240a02",
                              "sub_category": {
                                  "_id": "609d03273e86f0fb152409fc",
                                  "name": "Fender & Hood Panel",
                                  "description": "Fender",
                                  "category": "609042b3e1c0d2bb8e31262e",
                                  "updatedAt": "2021-05-13T10:44:55.922Z",
                                  "createdAt": "2021-05-13T10:44:55.922Z",
                                  "__v": 0
                              },
                              "model": {
                                  "range": {
                                      "start": 2000,
                                      "end": 2020
                                  },
                                  "_id": "609041afe1c0d2bb8e31262c",
                                  "company": "608abe0ab45f959f1d44f357",
                                  "name": "Accent",
                                  "description": "accent",
                                  "updatedAt": "2021-05-03T18:32:15.858Z",
                                  "createdAt": "2021-05-03T18:32:15.858Z",
                                  "__v": 0
                              },
                              "updatedAt": "2021-05-13T10:46:43.180Z",
                              "createdAt": "2021-05-13T10:46:43.180Z",
                              "__v": 0
                          },
                          "release_year": 2019,
                          "photos": [
                              {
                                  "_id": "609d04c43e86f0fb15240a0d",
                                  "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d04c33e86f0fb15240a0c.png"
                              }
                          ],
                          "updatedAt": "2021-05-13T10:51:48.337Z",
                          "createdAt": "2021-05-13T10:51:47.794Z",
                          "__v": 1
                      },
                      "supply_price": 5000,
                      "current_quantity": 0,
                      "updatedAt": "2021-05-13T13:22:28.901Z",
                      "createdAt": "2021-05-13T13:22:27.159Z",
                      "__v": 0
                  },
                  "quantity": 2000
              }
          ],
          "spare_part": {
              "description": {
                  "fit_note": "Nut"
              },
              "showcase": false,
              "active": true,
              "_id": "609d04c33e86f0fb15240a0c",
              "name": "Nut",
              "part_code": "28116-22000",
              "part_number": "28116A",
              "sub_category": {
                  "_id": "609d03933e86f0fb15240a02",
                  "sub_category": {
                      "_id": "609d03273e86f0fb152409fc",
                      "name": "Fender & Hood Panel",
                      "description": "Fender",
                      "category": {
                          "_id": "609042b3e1c0d2bb8e31262e",
                          "name": "Body",
                          "description": "bodyyy",
                          "updatedAt": "2021-05-10T18:48:57.315Z",
                          "createdAt": "2021-05-03T18:36:35.879Z",
                          "__v": 0
                      },
                      "updatedAt": "2021-05-13T10:44:55.922Z",
                      "createdAt": "2021-05-13T10:44:55.922Z",
                      "__v": 0
                  },
                  "model": "609041afe1c0d2bb8e31262c",
                  "updatedAt": "2021-05-13T10:46:43.180Z",
                  "createdAt": "2021-05-13T10:46:43.180Z",
                  "__v": 0
              },
              "release_year": 2019,
              "photos": [
                  {
                      "_id": "609d04c43e86f0fb15240a0d",
                      "path": "/opt/KOREA-AUTO-RWANDA/images/products/spare-part-609d04c33e86f0fb15240a0c.png"
                  }
              ],
              "updatedAt": "2021-05-13T10:51:48.337Z",
              "createdAt": "2021-05-13T10:51:47.794Z",
              "__v": 1
          },
          "current_quantity": 0,
          "updatedAt": "2021-05-13T13:22:29.921Z",
          "createdAt": "2021-05-13T13:22:28.894Z",
          "__v": 0
      },
      "unit_price": 10000,
      "quantity": 2000,
      "month": 4,
      "year": 2021,
      "day": 13,
      "week": 2,
      "updatedAt": "2021-05-13T13:22:29.932Z",
      "createdAt": "2021-05-13T13:22:29.932Z",
      "__v": 0,
      "imageUrls": [
          "http://104.236.61.92:4008/api/files/load/%2Fopt%2FKOREA-AUTO-RWANDA%2Fimages%2Fspare-parts%2Fspare-part-609d04c33e86f0fb15240a0c.png"
      ]
  }
]