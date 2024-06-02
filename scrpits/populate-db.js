// scripts/populate-db.js
const mongoose = require("mongoose");
const Image = require("../models/Images.js");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

const imageUrls = [
  "https://lh7-us.googleusercontent.com/F8cfLPBsTuXGTiI9nmo7J1piKBdkAxm2gNdJ6b1o67GO3oXyF5-5AH8N8EiIKnWgqblEkOSrWhGBl9heUeeNxPfuK_d9Vnnn-l33S9M1kQi3I2GzL04KV787_e4oQ6dtveGHXy-BH3kvnQO8=s800",
  "https://lh7-us.googleusercontent.com/hFfPShoXPhaL5dYrzbSQm2_jSiXMLMki6mL74dqhOLLd0qbC0n7Dgtwy25RlMRaNoA1d3MdD7imSdQ-iY9wIJHUFakrBHnFXWUqRrx3WvEinY9xLW7vkRLlSvPFD2IpsFqzokkuHcQmtpCL3=s800",
  "https://lh7-us.googleusercontent.com/qZq_SvG_5dC60bvQF5KUs9n6YKEuMFLYqz4i_3ers8CEFm5XeSweKc_9atWAs7TMAKW80I3ruBRi0WuBMA-GfEJRfBr42c14Z7BzcBl-yyYlA4oD-Inm8ENSGJqXSQahzz15eMyNWEdIdghb=s800",
  "https://lh7-us.googleusercontent.com/x3EHU-rDaFqT3nCKuQW6tG1FZ4SLbnGqarfAocjgUBARRyuzMTLtG1Z_sXhg1i5e2arlMxSfsiCUhX1op6_0srT7uD6WXITOfbHF5be-58lq8OOfqwZsoAqAV4RhxVN3yrZKnRMPl6zHh1Q2=s800",
  "https://lh7-us.googleusercontent.com/-4Pdx1Q9qd64jZSyoRBJXWeBX4cENB-SjCH8iTizAtLz9G0u4a1YgmbRPQVxXbUeT74LgtK-RhT4hEsNog6w-0oGmH9mAwi3NRry7dUQx7Y6QbfeT0ix9gHJDHYzMRFHej02C_ee5lEujL0W=s800",
  "https://lh7-us.googleusercontent.com/acisOpSCAMTbB-06GX1r1cWK6V4RV-EFxckSbN7ip4Nb079UFXoNNCm5eDF9mtw-djXsfiqsbOQF70uGTi9qE1hQI-ipoKjGFfyhPtq8J5bSmutHcu9Si2FSucrEcalsG5q8wEEdo9S6USJt=s800",
  "https://lh7-us.googleusercontent.com/G8mYMCTBTIKDSV4EYOhvS29BRId2h30W4jvZO_fyT4N1TOKWL6IV77cl9xIpZtNSHkOPLXWoDe5f3PvmnYqtLb9zVC3NF5gM0leI2peOu0ob0hKAoUUYw9q1Zo3UnjwlVaoao9j18a-r4kTJ=s800",
  "https://lh7-us.googleusercontent.com/KQtYwiABHuB2AaZbinKlAMN4Pqj6109YzRy6Pt2ZXTpAKIE9Zrb7VSRXqQWbKT0PubjepAIfsj2ih8DtmnVVAmEkIz4Bc3b0CLm5TWqoaqFFP5HJQTWp33aAIqFRxS_ZHDDbzU28qx3ru2P1=s800",
  "https://lh7-us.googleusercontent.com/FMGRDjf8EldIRiEisTYjubmHQ_vP6ZUUaNBsRLx3DIDQoRPNqJQLjKQ2Gp7_Ihq-4XYA3ypeou4_SFmBYpntg5qt7bNPbVh16M-zFT1KvBotoHR7tp4F8sbZ_vFAGXKPhKbLJ4afjVya89wA=s800",
  "https://lh7-us.googleusercontent.com/8O53Y_UJkn7hn-PtaXG-4iwiqri0nhMIohqXNULRKEjMpcyAzBLr1iU6UecNrlWbC64ofyenYder3u3JzBpcb6dja1WZk4fGJXs91cmsACAZS-2H_C8sK2bkrF8nnCf-wl7shpFKlj_991bo=s800",
  "https://lh7-us.googleusercontent.com/lNOFdXKGfPRDEF3XkIl3hVz8IHoJkDsZKlhqJnEJiEmpvMKhNxPKoS_hGmiRuOSqvqHfT9V0BtWGqeBTCYxAqgzIT3-K_yZFZSd4u4HyEafokpGJQbh84qAlKz9weTUBH3twKMIGgBxUpRyq=s800",
  "https://lh7-us.googleusercontent.com/2o9jNsFTH_ZtKiD_PdAPcQFAsIZ2_t5dzy4VW4x6lOq8KdozZf4pCodFTtg0G1S011S0nnTvag8juzEs0dbFyg2Xj-_jScV_tLC2qmB56C2hPcHdoMQuVepDfU7ugyvO98TEjx3XUtRJ_bK7=s800",
  "https://lh7-us.googleusercontent.com/YLjfGwRSPr7VB1cZd5kZ6u9uKmqJGK0mXX3ymh2mNGcMOufxVkcu6d7V0g2rl3_EDSzOM8i4YDsp2o46FWhtG_wIyGtRSeBR7RqGyLyH159ASsi9A60lGIdeizjeOHRFg2hCo1iUqezU4T3U=s800",
  "https://lh7-us.googleusercontent.com/iZU6Vne9tBKLPL5eQA3l-04KhU4uXid_rmTWU5LjeXE_lifcIunWLlgf-m40rdNaqD84fhCkL1G7meANpULkKneaFd8u7Smk4eT5pq9AdfchfqT5azwg1BGJkWLixVqVUYE9rr29E9j14WOS=s800",
  "https://lh7-us.googleusercontent.com/d2NEbC5KQYWNWIbFYaORXn-ljUddYtlmoW03kOfrR-2x7Iyt7Ngqv5RHj5BfPg61zHqeNl8pFSuODCQ4XTTkxwZGFHx1wByWscB9o8L4JZsgJkSjq4mzM4L0tIKWoS6FZjX0slxBrysUXAGw=s800",
  "https://lh7-us.googleusercontent.com/0CfxDNzn5-Lh1XvnHsNBQNSqKXTLwbT4yR0BK5I96EHy8EKSGQQ9P9UGwDCOWrsgsxnhWwPrwooL_sTdkv9jlad1qXuv6DPCdVxCB8m1cUj1XQBd9nSDfljhSYmJHnIu_Cg6bijVjAab7A4n=s800",
  "https://lh7-us.googleusercontent.com/7xtNO0h3xE5W8t_sinOsN9-CRKdcDR_VOlc7lQzPzQxoKNgh7dmIcwbYY1-nYR9sBf86ujgdpmsGyK0StfP4YXvuzkiAyL2wFvrIu-61pzu0H9r_qg9USqXU7WQTWzeqU06SiajsO-gtp2Uh=s800",
  "https://lh7-us.googleusercontent.com/RBRJ0nm3Aajxx6H-_2JYJdg_c9V5oymX6FEiqtw9Mn4Jx0HRmsYldnua0vBQR9m9ktlCIJkFEDZMH8UdgKzuvh2NBNub3ZbXIAbDuT4X3k77CFlLW_7vY6dCxnPLAE8oXaZ6joRjY_JKe71X=s800",
  "https://lh7-us.googleusercontent.com/yA7UKAMqRAiY5DDPGHT_5N5R6D8SCjIefBh9OvR16sx10RGwfh1IPyme7tdoDZG6I5MAoAXXtrC3xKLVTUbsthnkfc3fmx60S-Stn7hSNOrK-nGjHqE8R7GFf4E4YXI5Q3iKw285jx1PFIDP=s800",
  "https://lh7-us.googleusercontent.com/inqKEimHwYLKfHVl12DQot5N199psXhRfXD4BpI6tT0LvK9mv6m-h0OQi0ZSAPYDxUrQnFpjBbpiY6lC48z5B1oIi7-kBs0D9zt_gmqC5m1cReclvyUN_113PZPJETA7wmWEjch4P-RsYJ1h=s800",
  "https://lh7-us.googleusercontent.com/7_SzQZ6mbNqB3I3AX9TN08ex8inLpH9YEpf91hyQDTxCrONdZU5wmEctP35o-59FRxR-jMfppBdbphkKb5xbiaOocfbDmTJSvCnICPaXNDRUwX6aSkMcIndi4_4D8EJpElG5LOXZfisRyXGl=s800",
  "https://lh7-us.googleusercontent.com/6vMiVOqfuh2selBR6lGOojGVkjtAzCfDTQI0HbE1FXGjpbfODlOuaKtrNZfs4YPGLzepsZ5aJZySySK6OOdgwt5IX3EWm-9yQtj-tHWK1UjHZ6b2Gnfb92DkE7vUP53iiIeNTMezgAKdFvgc=s800",
  "https://lh7-us.googleusercontent.com/0AhDUdpslp7SV-vNwd5SG2XpD2uZ8ySPeEmSquG0gBY5Dq6uszmCJXwOOBWlo3QTqfrF1H1lKeE0pWP5hX7axnpuhsNANgxVpm9Xnhsw7qpKGchhE4smUZNMRqiBqWJV1HNfgQzW5nYcbjLf=s800",
  "https://lh7-us.googleusercontent.com/4XOdO_mABc6yJe10plIP2oF5kvI5fFVjAZwStw_KBrWZ3e1GM0qFdpPRoUMNSrL_lXr2eeKXIA4rivKraOz1Tea7MSjHVsbCgbeGSayQ4O-l19iTRBqfK_H9SopE7f81wqIrMWEsLfi5ZXYr=s800",
  "https://lh7-us.googleusercontent.com/oUuzVK24jzwYK-DL_dvePdLK9AXePv68Ww_Twg2czhMYeuU3CO8_exuEE6V-CMlmmN3mJ-mxyCK4bJ5j-WIFRUYVhOmqm21TCib4E6SKpKeNwjdq_gXek1xA9IrCt_XT4zpkrdSGz_oEAVjL=s800",
  "https://lh7-us.googleusercontent.com/Nrk_hDJC4ue3bfMsx5ihDtX-B3YGckMy9tKw_7qbv6U0qgeHKybSWvix82Em2oesrJFLPa4T-XoAM0S5fSQbs0TPUafP4dvRPqNGYJLAmVOvGlneKig5XELJRCVUoRSd0I6PbympZ0Z_Zs6T=s800",
  "https://lh7-us.googleusercontent.com/ZW74tftgk3S0zDdBqgtsOnslz2_ZE2dqD0wQzUzkAQEVilfkN6ONzmjpwdbRq44DUOoXu-Hp0FDoXV0SNwinWvIQcRH5WA36hhBeOMKicdVulI4aUxQXiq2o0orSPrpqNShpXmQQnn6DSibh=s800",
  "https://lh7-us.googleusercontent.com/Bg7NHgI8NOFGDuUiH6pIBJYVkwq6Ye_0qoL_n7zOheIdxK28hsVOvS5de4f_fyMyD1pnBk7yalJbmJz7lk8UhPq8ei2mhcWbbAtJeqEHeLynlekkrtrAujx8WijvKbr3v8p3Rz7JqPs8oLGm=s800",
  "https://lh7-us.googleusercontent.com/7KPMRLq_R0s4ZLflqM7z1NfYbS9I8T-kFdF8c7iCdY_tZI8uGFrkTI7SGXe8zkStn_7HixqOEvaALSGEBr9hfAGyGaG4IgthBfP7O_760rR4rfwrUYhG_pMKhKjfrmKgrv9OPUBxCs7nMOM3=s800",
  "https://lh7-us.googleusercontent.com/28eQoJoxoNIyAcXkHAGLxTZ9Iu9w-Ttbz137pOaWamjHmmsUZHdGfd0aUD9wDniJK4qMwVyXiVnrVfIIBZvA5RggxHqYvM-Kz8zJt1GnxwQJujKQI-jg58tB1Epgy3MwzdOMBpvAA8lICcYB=s800",
  "https://lh7-us.googleusercontent.com/A95xFEOWmJOZ4puUhqXt4QQuEq9lbsowMcsLUuwbmA3NdDlxeJr6kQDA3wsII-8rlmqF7ukA7yLAJgll7NqAnpis4sKpRRk3hMB_MliiVZqH667DnO47qOl5qAtcMsYadMXWk79GoOkq5oJt=s800",
  "https://lh7-us.googleusercontent.com/Qm__crYA230CpnSdujcLWZiv-T7VcGJ2SawybSYKNQcbhBmvyZOM1qdT4GwJwnY0nV-6YfDagpgAdzOtdO1wD4LORJU0mRv5bAlfrjKhkgddqqSZIeOQAggPL_vWjxJlK5dcyTrSOlnydb56=s800",
  "https://lh7-us.googleusercontent.com/2IIRtFA32rZihg05tobCjsqJObS-hKn-xek7SDk_jT9M5_tOa40--3Yjl8GnToCQEBF8xylDB0iqN8Tu8fw-jRvl27x4Ut1mHYfkptsBPYNWdIsMrMkTd-vL4eUSKQGMqZnnsmNmF1FzDN3V=s800",
  "https://lh7-us.googleusercontent.com/iQef-FXMKYZbKdnoBwf51-xl0Rufs-u95sQFV8sShvSzpkn7eKIk6Vs8ySuFcZNgKpygA0lkL2qvpgQIBKtnrt-6Y23XwSjXyPbm4f05M7Y3pAtzGsXkzl-uLJ4aEla7dAyYO7Bj-Sbl1DVM=s800",
  "https://lh7-us.googleusercontent.com/dqTOJV-q1DfOlgxJhRryIOKA0jauQi7_Gn-ovdz6tVLlVn5n-hLUsuxu-1CZ0WciRIER8HQr-FAfsse8Ney9rhGRuYwNdatFTL9g0yb9LGzZBYcCGWfdXk9S7tVbqbrGzKLVyvZmptlxaOix=s800",
  "https://lh7-us.googleusercontent.com/o6NsNr-jVOFDbC-6hyHy1qdZAcoEAbYmL7SRlnPgkFNPCJEBh9YIGRw8PqPlG--O1pVg3ChG6GRDm8X1ypThMX6TK9zP-qexA25bTgT5pE_sT0wHMgoW1kPrH8LvL0qpKXHmzU90NszTdnE1=s800",
  "https://lh7-us.googleusercontent.com/ddQ5WkUAyBvf57eMhBsNGr7v8IULJvnL9ABoTou-A4agJc7vxDFqQf7_m59W5bAytnBv9Aph4CGDZV6c-zN5yc97ppLJEgiNBNBE1KhnxOp9pjsGtqC2UJyC3Kguflnhqv8G-xJ2pqaXALgB=s800",
  "https://lh7-us.googleusercontent.com/qNPkjyxnVOA8P5Ha8--aOeVE77NdKHO_SRLfqvQztGylQlFClEfYq4Qypx7bhQz3itKR4dR1oa57hRsN4FWl0FIFlAkSPgNHU55yOvq5TgGmUObU3zBd5Yjr4yBHwELnGy6zeGC-QYwpsCtq=s800",
  "https://lh7-us.googleusercontent.com/DtT5-zqjG14agy8eMGC57a9bqwJqvszc2pJKPjCxDRjdmd8C8MIIQJOnQHl5MZWPl6MfYm4z_WSKT3jKlGkKKhagvNDJ-wzCXOr9xYI0_WR7ShfebXYNZ4Wy7lLiEgdcjP1auIKbU6AHxz3I=s800",
  "https://lh7-us.googleusercontent.com/FQ_oLot-yWGv5oVmkZ689X-YXwmftGg_zbvzMbWYTH1bOvrDd1pvYJuATo7EZ29LBwJksZhOGMxSkc1Mn5BAsPCvTMJDP_svraQWfCZdLLTiRjET3FVTg3hHq63I4kFSHZ-jqfjTmcBXdRsh=s800",
  "https://lh7-us.googleusercontent.com/1FLOZdPlRQgN6YKomMYtfr7AQgmKqa20g_Vi8YVPh15MNwZVPw1N5PBhmwGpYAjypOayhSc6xoX2R1rZPwfXgRJu6fyhsjcZzicTzPFcHP-a2Cs1uBAPivuaR0rrjm1hdr1nSJ18ooD2hfbF=s800",
  "https://lh7-us.googleusercontent.com/YLDbSQPos33zGhESt8Vl_TWexwqoIKZNjoszlgPKllIWpidGGkpyineCnRHLrJGiboMS9AgiL5PKhQ9vjMz25No_-UbiMYpaCD5aIkeF8NISiVrhX3Lfn88srIH0x4Z46Gv9vDFnDDjZkZ4-=s800",
  "https://lh7-us.googleusercontent.com/gN10TOgqAkvPpG5fwEV04i7k8lVL5QfPyOiPTKIPZ41NIrQn_zKof2dO7__iDs-ineQUgjbAnatp_fEx4vxSJCvj_VbcoOAOnTsot3bFMBjSg6YXdh9HEmn_yhfa1NmopFGYbR-xbhq9SU_C=s800",
  "https://lh7-us.googleusercontent.com/ev1Nc0hVXz3vQkf9YJn4tZM34GQCeZXd3bDouRXz8SvmBzWI7yeMdD6y50bRVyE78xo8lIKBDl1B-sCH19qOk6vPem9B7q-IwTRkTjtONzaV5Bvxo4B1Vi8hcztEKUVglNtzEUqWx0AxwnbW=s800",
  "https://lh7-us.googleusercontent.com/iRrvf2Am-VgY__ylYCCTf0AitwdjGud4B6TZPO1RuLQTvv6aBWj2L2ziC7aWgTLhDYKb2L2X6Lch3YfIm0YEIJ0HSo2YHmO-VfuQiw19ew3L2n5C_qm0VEbPUpk8wYUpnV9TVbPBdPTd81S7=s800",
  "https://lh7-us.googleusercontent.com/1JNbpGIzJ9iMsuVvbDZ3j6kF2ElU4C9K94A6d825PyNe2fKht7UkDtyvVe7VlxPuqyOsOERaEw6aS7YPSGzte8m73dGzczmkeR1IUaudTYhLoDgFsverPJmny3uXs71SUv5nt-hcosrf543m=s800",
  "https://lh7-us.googleusercontent.com/C6hxTuuA__9-5MEAm41Hxzt8QhvpiHwKj4Or9j-TPIIyVft120Vcs5aetwKlS2n9LKyc9SfCao8TDmzSykk0NzwhQOE4-3Phqc8j5OIY4DPkJ4eYRM3cf9iKF1AEs8gXn3uFX4EpC0LDrLWj=s800",
  "https://lh7-us.googleusercontent.com/GZmeQE2i8rZutntrq1GxGh-mzHEr8WEn9vSRU2U7YoPBqJgqnF-PkqwrKVxQyhv66zZTQMCNNAuv0Upr97YN6ZtBz0PeRMLzEwX1a3iHIRUomhjmxa7xd39JGwMJu6xnty1vFQOFWMk18rRp=s800",
  "https://lh7-us.googleusercontent.com/vq-0kTnM3x3mYeULqZ2fSUxIunL9nYSMiWXmEFPLnQ6PHX8AMNQGgJobdAy_h5yb_hJAk03-b56LtD0oJ0fanE-08f5r_J_UrbfLfu09YM9mCHok9jDt-t67SQE8LOyXDV89GAK7Nxf3pIAJ=s800",
  "https://lh7-us.googleusercontent.com/qwpfzhv21uyzENElxhcub77jGjj9WhYxGV5NGhhtULUuqLYsMuhNDANM19iXHXq64DB3FGTEdGROkyZJvzKU75V9WRHIQYQEfHJ1UppTbiG60QM4XRNwgK_D-C3SNOxVr8AMcCZTHtBIatC3=s800",
  "https://lh7-us.googleusercontent.com/43kvZ7LoacA5Zz4BL-Ms4WzZfrDzAzvxtah5Zm1aCKWi8NyhxqQ_VZRQTf7IVy9PGxwsw5kEraCC0QaQwisUe-UBOQL-_w3P8w-VSjCi1ZdWmcoFcA_XwooLB848paY5V8paqfDHpVIhW5yP=s800",
];

const newUrls = [
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/F8cfLPBsTuXGTiI9nmo7J1piKBdkAxm2gNdJ6b1o67GO3oXyF5-5AH8N8EiIKnWgqblEkOSrWhGBl9heUeeNxPfuK_d9Vnnn-l33S9M1kQi3I2GzL04KV787_e4oQ6dtveGHXy-BH3kvnQO8=s800",
    title: "Two point Seat belt",
    desc: "In the hyperloop, two-point seat belts are crucial for passenger safety, securing occupants across the lap and pelvis to minimize movement during sudden deceleration or unexpected motions. Studies indicate they can reduce fatal injury risk by up to 45% in crashes. Implementing these seat belts enhances overall safety by maintaining stability during high-speed travel.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/hFfPShoXPhaL5dYrzbSQm2_jSiXMLMki6mL74dqhOLLd0qbC0n7Dgtwy25RlMRaNoA1d3MdD7imSdQ-iY9wIJHUFakrBHnFXWUqRrx3WvEinY9xLW7vkRLlSvPFD2IpsFqzokkuHcQmtpCL3=s800",
    title: "drop-down Oxygen Masks",
    desc: `"In the hyperloop system, drop-down units, similar to "Dixie Cup Masks" used in airlines, are continuous-flow, phase-dilution masks that deliver a mixture of 100% oxygen and cabin air to the user. These masks ensure passenger safety by providing necessary oxygen during emergencies, allowing for safe breathing even in the event of a significant pressure drop within the hyperloop capsule. This system is designed to maintain passenger safety and comfort during high-speed travel."`,
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/qZq_SvG_5dC60bvQF5KUs9n6YKEuMFLYqz4i_3ers8CEFm5XeSweKc_9atWAs7TMAKW80I3ruBRi0WuBMA-GfEJRfBr42c14Z7BzcBl-yyYlA4oD-Inm8ENSGJqXSQahzz15eMyNWEdIdghb=s800",
    title: "Oxygen Storage Cylinders",
    desc: "In the context of the hyperloop system, gaseous aviator's breathing oxygen (ABO) can be stored in high-pressure (1800-2200 psi) or low-pressure (400-450 psi) containers. These containers provide an economical and efficient storage solution for supplying oxygen to passengers and crew within the hyperloop capsules. The flexibility to store oxygen at different pressures ensures reliable access to breathable air during the journey, enhancing safety measures for all occupants onboard.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/x3EHU-rDaFqT3nCKuQW6tG1FZ4SLbnGqarfAocjgUBARRyuzMTLtG1Z_sXhg1i5e2arlMxSfsiCUhX1op6_0srT7uD6WXITOfbHF5be-58lq8OOfqwZsoAqAV4RhxVN3yrZKnRMPl6zHh1Q2=s800",
    title: "Escape Slides",
    desc: "In the hyperloop system, escape slides can be adapted as inflatable evacuation devices installed inside capsules for rapid passenger evacuation during emergencies. These slides offer a safe and efficient means of exiting the capsule in case of an evacuation scenario. By deploying these inflatable evacuation devices, passengers can quickly and safely exit the hyperloop capsule, ensuring their well-being during unforeseen situations.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/-4Pdx1Q9qd64jZSyoRBJXWeBX4cENB-SjCH8iTizAtLz9G0u4a1YgmbRPQVxXbUeT74LgtK-RhT4hEsNog6w-0oGmH9mAwi3NRry7dUQx7Y6QbfeT0ix9gHJDHYzMRFHej02C_ee5lEujL0W=s800",
    title: "Fire Extinguisher",
    desc: "In the hyperloop, Halon 1211 fire extinguishers are key for rapid and residue-free fire suppression. These extinguishers, pressurized with nitrogen, discharge as a vapor, effectively penetrating hard-to-reach areas. They're perfect for safeguarding delicate equipment like computers and automotive engines. Did you know? Halon 1211 extinguishers boast a 95% success rate in extinguishing fires.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/acisOpSCAMTbB-06GX1r1cWK6V4RV-EFxckSbN7ip4Nb079UFXoNNCm5eDF9mtw-djXsfiqsbOQF70uGTi9qE1hQI-ipoKjGFfyhPtq8J5bSmutHcu9Si2FSucrEcalsG5q8wEEdo9S6USJt=s800",
    title: "Stoppers",
    desc: "In the hyperloop, wheel chocks or similar mechanism can play a vital role in preventing parked pods from rolling away. These wedge-shaped objects, crafted from robust materials like rubber or composites, ensure safety by securing vehicles in place. Wheel chocks are indispensable tools, especially when working on parked vehicles or when they're parked on inclines. Remarkably, wheel chocks have reduced accidents by up to 80% in similar transportation systems.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/G8mYMCTBTIKDSV4EYOhvS29BRId2h30W4jvZO_fyT4N1TOKWL6IV77cl9xIpZtNSHkOPLXWoDe5f3PvmnYqtLb9zVC3NF5gM0leI2peOu0ob0hKAoUUYw9q1Zo3UnjwlVaoao9j18a-r4kTJ=s800",
    title: "Blind Spot Detectors",
    desc: "Blind spots, typically unseen by drivers, pose significant safety risks on the road. These spots can result from a vehicle's components or surrounding cars and people. Fortunately, with blind spot detection and warning systems, drivers receive crucial information about unseen objects, enhancing overall safety. Interestingly, vehicles equipped with such systems have shown a 30% reduction in accidents related to blind spots.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/KQtYwiABHuB2AaZbinKlAMN4Pqj6109YzRy6Pt2ZXTpAKIE9Zrb7VSRXqQWbKT0PubjepAIfsj2ih8DtmnVVAmEkIz4Bc3b0CLm5TWqoaqFFP5HJQTWp33aAIqFRxS_ZHDDbzU28qx3ru2P1=s800",
    title: "Fire Alarm",
    desc: "Fire alarms, comprising various devices, employ visual and audio signals to alert individuals to potential fire, smoke, or carbon monoxide hazards within their coverage area. Typically integrated into fire alarm systems, they offer zonal coverage for both residential and commercial properties. Warning signals include loud sirens/bells, flashing lights, or a combination of both. Advanced systems may incorporate additional alerts, such as voice messages or phone calls. Notably, properties equipped with fire alarm systems have witnessed up to a 50% reduction in fire-related damages.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/FMGRDjf8EldIRiEisTYjubmHQ_vP6ZUUaNBsRLx3DIDQoRPNqJQLjKQ2Gp7_Ihq-4XYA3ypeou4_SFmBYpntg5qt7bNPbVh16M-zFT1KvBotoHR7tp4F8sbZ_vFAGXKPhKbLJ4afjVya89wA=s800",
    title: "Fire Sprinkler System",
    desc: "A fire sprinkler system, a form of automatic extinguishing system (AES), effectively curtails fire growth and spread. It achieves this by discharging water through a network of sprinkler heads linked to a distribution piping system. This swift response mechanism significantly reduces property damage and minimizes the risk to occupants. Remarkably, buildings equipped with fire sprinkler systems have seen up to a 60% reduction in fire-related fatalities and a 70% decrease in property losses.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/8O53Y_UJkn7hn-PtaXG-4iwiqri0nhMIohqXNULRKEjMpcyAzBLr1iU6UecNrlWbC64ofyenYder3u3JzBpcb6dja1WZk4fGJXs91cmsACAZS-2H_C8sK2bkrF8nnCf-wl7shpFKlj_991bo=s800",
    title: "Intercoms",
    desc: "It's a stand-alone voice communications system specifically designed for use within a hyperloop platform network, spanning the entirety of the infrastructure or portably within designated coverage areas. Its adaptability makes it invaluable for maintaining effective communication within hyperloop pods, ensuring seamless connectivity throughout the high-speed transit system.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/lNOFdXKGfPRDEF3XkIl3hVz8IHoJkDsZKlhqJnEJiEmpvMKhNxPKoS_hGmiRuOSqvqHfT9V0BtWGqeBTCYxAqgzIT3-K_yZFZSd4u4HyEafokpGJQbh84qAlKz9weTUBH3twKMIGgBxUpRyq=s800",
    title: "Crew Calling Button",
    desc: "Crew calling buttons are installed for passengers to quickly alert staff in case of emergencies or situations beyond their control.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/2o9jNsFTH_ZtKiD_PdAPcQFAsIZ2_t5dzy4VW4x6lOq8KdozZf4pCodFTtg0G1S011S0nnTvag8juzEs0dbFyg2Xj-_jScV_tLC2qmB56C2hPcHdoMQuVepDfU7ugyvO98TEjx3XUtRJ_bK7=s800",
    title: "Public Address System",
    desc: " A public address system (or PA system) is an electronic system comprising microphones, amplifiers, loudspeakers, and related equipment. They are used for making announcements to passengers, including emergency situations",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/YLjfGwRSPr7VB1cZd5kZ6u9uKmqJGK0mXX3ymh2mNGcMOufxVkcu6d7V0g2rl3_EDSzOM8i4YDsp2o46FWhtG_wIyGtRSeBR7RqGyLyH159ASsi9A60lGIdeizjeOHRFg2hCo1iUqezU4T3U=s800",
    title: "Emergency lighting systems",
    desc: "Emergency lighting systems are crucial during power outages, acting as lifesavers by automatically illuminating exit signs and pathway lights. Powered by batteries, these systems guide occupants to safety, reducing panic and ensuring a swift response in emergencies.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/iZU6Vne9tBKLPL5eQA3l-04KhU4uXid_rmTWU5LjeXE_lifcIunWLlgf-m40rdNaqD84fhCkL1G7meANpULkKneaFd8u7Smk4eT5pq9AdfchfqT5azwg1BGJkWLixVqVUYE9rr29E9j14WOS=s800",
    title: "CCTV Cameras",
    desc: "Surveillance cameras that monitor the pod and station for security purposes.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/d2NEbC5KQYWNWIbFYaORXn-ljUddYtlmoW03kOfrR-2x7Iyt7Ngqv5RHj5BfPg61zHqeNl8pFSuODCQ4XTTkxwZGFHx1wByWscB9o8L4JZsgJkSjq4mzM4L0tIKWoS6FZjX0slxBrysUXAGw=s800",
    title: "Noise insulation",
    desc: "Noise insulation, utilizing advanced materials like acoustic panels, foam, and mass-loaded vinyl, dramatically reduces sound transmission within hyperloop capsules. This innovation ensures a serene and comfortable travel experience for passengers, enhancing overall satisfaction. Remarkably, noise insulation has shown to decrease noise levels by up to 70%, making hyperloop travel quieter than ever before.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/0CfxDNzn5-Lh1XvnHsNBQNSqKXTLwbT4yR0BK5I96EHy8EKSGQQ9P9UGwDCOWrsgsxnhWwPrwooL_sTdkv9jlad1qXuv6DPCdVxCB8m1cUj1XQBd9nSDfljhSYmJHnIu_Cg6bijVjAab7A4n=s800",
    title: "Wheelchair securing system",
    desc: "In the hyperloop, a robust wheelchair securing system guarantees the safe transport of wheelchair users by firmly anchoring their chairs to the capsule floor. These systems, meticulously designed for comfort and stability, prioritize the well-being of wheelchair users during transit. Impressively, reliable securing systems have been shown to increase passenger confidence and comfort by up to 80%, revolutionizing accessibility in hyperloop travel.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/7xtNO0h3xE5W8t_sinOsN9-CRKdcDR_VOlc7lQzPzQxoKNgh7dmIcwbYY1-nYR9sBf86ujgdpmsGyK0StfP4YXvuzkiAyL2wFvrIu-61pzu0H9r_qg9USqXU7WQTWzeqU06SiajsO-gtp2Uh=s800",
    title: "Tactile paving",
    desc: "In the hyperloop, tactile paving, or tactile ground surface indicators (TGSI), plays a pivotal role in aiding visually impaired individuals in navigation. These textured patterns, strategically placed on walkways, platforms, and crossings, offer tactile cues that guide passengers safely through the hyperloop environment. Notably, the implementation of tactile paving has shown to enhance navigation for visually impaired individuals by up to 90%, ensuring inclusivity and accessibility in hyperloop transportation.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/RBRJ0nm3Aajxx6H-_2JYJdg_c9V5oymX6FEiqtw9Mn4Jx0HRmsYldnua0vBQR9m9ktlCIJkFEDZMH8UdgKzuvh2NBNub3ZbXIAbDuT4X3k77CFlLW_7vY6dCxnPLAE8oXaZ6joRjY_JKe71X=s800",
    title: "Ramps",
    desc: "In the hyperloop, ramps serve as essential components for facilitating wheelchair access to capsules, stations, and other elevated areas, ensuring seamless accessibility for individuals with mobility challenges. By providing a sloped surface, ramps enable wheelchair users to navigate effortlessly, enhancing their overall travel experience. Remarkably, the incorporation of ramps has been shown to increase accessibility for individuals with mobility challenges by up to 95%, promoting inclusivity and equal opportunity in hyperloop transportation.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/yA7UKAMqRAiY5DDPGHT_5N5R6D8SCjIefBh9OvR16sx10RGwfh1IPyme7tdoDZG6I5MAoAXXtrC3xKLVTUbsthnkfc3fmx60S-Stn7hSNOrK-nGjHqE8R7GFf4E4YXI5Q3iKw285jx1PFIDP=s800",
    title: "Baggage scanners",
    desc: "In the hyperloop, baggage scanners serve as vital security devices, ensuring the safety of passengers and preventing potential threats. These scanners, employing advanced X-ray technology, meticulously inspect the contents of luggage for prohibited items or potential hazards. By enhancing security measures, baggage scanners contribute to a secure and hassle-free travel experience for all passengers. Impressively, the deployment of baggage scanners has led to a 90% increase in security efficiency, reinforcing the safety protocols of hyperloop transportation.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/inqKEimHwYLKfHVl12DQot5N199psXhRfXD4BpI6tT0LvK9mv6m-h0OQi0ZSAPYDxUrQnFpjBbpiY6lC48z5B1oIi7-kBs0D9zt_gmqC5m1cReclvyUN_113PZPJETA7wmWEjch4P-RsYJ1h=s800",
    title: "Air quality monitors",
    desc: "In the hyperloop, air quality monitors play a crucial role in ensuring a healthy and comfortable environment for passengers. These devices measure pollutants and particulate matter in real-time, providing valuable data on air quality levels both indoors and outdoors. By implementing proactive measures based on this information, such as adjusting ventilation systems or deploying air purifiers, hyperloop operators can optimize air quality and enhance the well-being and quality of life for passengers. Remarkably, studies have shown that proactive interventions driven by air quality monitoring can lead to a significant improvement in passenger satisfaction and overall travel experience.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/7_SzQZ6mbNqB3I3AX9TN08ex8inLpH9YEpf91hyQDTxCrONdZU5wmEctP35o-59FRxR-jMfppBdbphkKb5xbiaOocfbDmTJSvCnICPaXNDRUwX6aSkMcIndi4_4D8EJpElG5LOXZfisRyXGl=s800",
    title: "Heat detectors",
    desc: "In the hyperloop, heat detectors serve as critical safety devices, detecting elevated temperatures or fires within capsules, stations, and other enclosed spaces. These detectors promptly trigger alarms to alert occupants and authorities, facilitating rapid response measures. By playing a crucial role in fire detection and prevention, heat detectors contribute to a substantial reduction in property damage and the potential loss of life. Remarkably, the integration of heat detectors has been shown to decrease fire-related damages by up to 80%, underscoring their importance in ensuring the safety and security of hyperloop transportation.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/6vMiVOqfuh2selBR6lGOojGVkjtAzCfDTQI0HbE1FXGjpbfODlOuaKtrNZfs4YPGLzepsZ5aJZySySK6OOdgwt5IX3EWm-9yQtj-tHWK1UjHZ6b2Gnfb92DkE7vUP53iiIeNTMezgAKdFvgc=s800",
    title: "EPIRBs (Emergency Position Indicating Radio Beacons)",
    desc: "In the hyperloop, EPIRBs (Emergency Position Indicating Radio Beacons) serve as crucial distress alerting devices, transmitting distress signals in emergencies such as capsule malfunctions or incidents. These beacons provide search and rescue authorities with precise location information, enabling swift response and rescue operations. By deploying EPIRBs, hyperloop operators ensure the safety and security of passengers, minimizing response time and maximizing the chances of successful rescue in emergency situations. Remarkably, the implementation of EPIRBs has been shown to significantly reduce emergency response times, enhancing overall safety standards in hyperloop transportation.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/0AhDUdpslp7SV-vNwd5SG2XpD2uZ8ySPeEmSquG0gBY5Dq6uszmCJXwOOBWlo3QTqfrF1H1lKeE0pWP5hX7axnpuhsNANgxVpm9Xnhsw7qpKGchhE4smUZNMRqiBqWJV1HNfgQzW5nYcbjLf=s800",
    title: "SARTs (Search and Rescue Transponders)",
    desc: "In the hyperloop, SARTs (Search and Rescue Transponders) serve as indispensable emergency signaling devices, facilitating the swift localization and rescue of individuals in distress. Upon activation, SARTs emit radar signals detectable by nearby ships or aircraft, enabling rapid response and rescue operations. By deploying SARTs, hyperloop operators enhance safety measures, ensuring prompt assistance in emergency situations. Remarkably, the integration of SARTs has been shown to significantly reduce emergency response times, contributing to the overall safety and security of hyperloop transportation.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/4XOdO_mABc6yJe10plIP2oF5kvI5fFVjAZwStw_KBrWZ3e1GM0qFdpPRoUMNSrL_lXr2eeKXIA4rivKraOz1Tea7MSjHVsbCgbeGSayQ4O-l19iTRBqfK_H9SopE7f81wqIrMWEsLfi5ZXYr=s800",
    title: "Fireman's outfits",
    desc: "In the hyperloop, fireman's outfits are essential protective gear designed to safeguard firefighters from extreme heat, flames, and hazardous environments during emergency response operations. Comprising a helmet, fire-resistant coat and trousers, gloves, boots, and a self-contained breathing apparatus (SCBA), these outfits ensure the safety and well-being of firefighters in high-risk situations. By equipping firefighters with specialized gear, hyperloop operators enhance emergency response capabilities, minimizing risks and ensuring the effective management of firefighting incidents. Remarkably, the implementation of fireman's outfits has been shown to significantly improve firefighter safety and operational efficiency in hyperloop transportation systems.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/oUuzVK24jzwYK-DL_dvePdLK9AXePv68Ww_Twg2czhMYeuU3CO8_exuEE6V-CMlmmN3mJ-mxyCK4bJ5j-WIFRUYVhOmqm21TCib4E6SKpKeNwjdq_gXek1xA9IrCt_XT4zpkrdSGz_oEAVjL=s800",
    title: "Survival suits",
    desc: "In the hyperloop, survival suits, also known as immersion suits, are essential protective garments designed to enhance passenger safety during emergencies. These specialized suits provide thermal protection and buoyancy in cold water environments, significantly increasing the chances of survival in the event of capsule submersion or water-related emergencies. By equipping passengers with survival suits, hyperloop operators prioritize safety and preparedness, ensuring effective responses to unforeseen incidents. Remarkably, the integration of survival suits has been shown to greatly enhance passenger survivability and overall safety standards in hyperloop transportation systems.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/Nrk_hDJC4ue3bfMsx5ihDtX-B3YGckMy9tKw_7qbv6U0qgeHKybSWvix82Em2oesrJFLPa4T-XoAM0S5fSQbs0TPUafP4dvRPqNGYJLAmVOvGlneKig5XELJRCVUoRSd0I6PbympZ0Z_Zs6T=s800",
    title: "Satellite phones",
    desc: "Satellite phones are pivotal communication devices, providing direct connectivity to satellites. During natural disasters, they play a crucial role in facilitating rescue operations and disseminating critical updates. Research indicates that satellite phones can enhance the efficiency of relief efforts by reducing response times by up to 50% and increasing the effectiveness of rescue operations by 80%. In the hyperloop context, satellite phones will be instrumental in ensuring uninterrupted communication and passenger safety, thereby revolutionizing travel in a dynamic and technologically advanced manner.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/ZW74tftgk3S0zDdBqgtsOnslz2_ZE2dqD0wQzUzkAQEVilfkN6ONzmjpwdbRq44DUOoXu-Hp0FDoXV0SNwinWvIQcRH5WA36hhBeOMKicdVulI4aUxQXiq2o0orSPrpqNShpXmQQnn6DSibh=s800",
    title: "Pyrotechnic flares",
    desc: "Pyrotechnic flares serve as essential signaling devices, emitting bright light and/or smoke to attract attention during emergencies. Widely deployed in maritime and aviation contexts, they play a pivotal role in signaling distress and guiding rescuers to the precise location. Research indicates that pyrotechnic flares have been effective in increasing visibility and expediting rescue operations by up to 70%, ensuring swift and efficient responses during critical situations. In the hyperloop, these flares would offer an additional layer of safety, providing a visible signal to aid in emergency response and passenger evacuation.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/Bg7NHgI8NOFGDuUiH6pIBJYVkwq6Ye_0qoL_n7zOheIdxK28hsVOvS5de4f_fyMyD1pnBk7yalJbmJz7lk8UhPq8ei2mhcWbbAtJeqEHeLynlekkrtrAujx8WijvKbr3v8p3Rz7JqPs8oLGm=s800",
    title: "Emergency lighting",
    desc: "Emergency lighting is a critical system comprising battery-backed light sources that automatically activate during power outages. This ensures visibility and enables safe evacuation in buildings and public spaces. Studies have shown that effective emergency lighting systems can reduce evacuation times by up to 50%, significantly enhancing overall safety and emergency response capabilities. In the hyperloop, such systems would play a vital role in ensuring passenger safety and facilitating swift evacuation procedures during unforeseen circumstances.",
  },

  {
    imgurl:
      "https://lh7-us.googleusercontent.com/7KPMRLq_R0s4ZLflqM7z1NfYbS9I8T-kFdF8c7iCdY_tZI8uGFrkTI7SGXe8zkStn_7HixqOEvaALSGEBr9hfAGyGaG4IgthBfP7O_760rR4rfwrUYhG_pMKhKjfrmKgrv9OPUBxCs7nMOM3=s800",
    title: "Hyperloop Vessel Tracking Systems (VTS)",
    desc: "Hyperloop Vessel Tracking Systems (VTS) Integrated within Hyperloop capsules, VTS ensures safe navigation by exchanging data with nearby capsules, base stations, and satellites.Studies indicate VTS reduces collision risks by up to 55%, enhancing safety and efficiency in Hyperloop traffic management. Costs vary based on equipment type and features, ranging from ₹69,850 to ₹1,50,000 per unit. Compliance with safety standards ensures its critical role in Hyperloop operations.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/28eQoJoxoNIyAcXkHAGLxTZ9Iu9w-Ttbz137pOaWamjHmmsUZHdGfd0aUD9wDniJK4qMwVyXiVnrVfIIBZvA5RggxHqYvM-Kz8zJt1GnxwQJujKQI-jg58tB1Epgy3MwzdOMBpvAA8lICcYB=s800",
    title: "Safety alert systems",
    desc: "Integral to Hyperloop pods, safety alert systems swiftly notify occupants of emergencies like fire, flooding, or equipment failures, enabling rapid response. Comprehensive systems reduce emergency response times by up to 40%, bolstering safety and minimizing potential harm. Costs vary, with basic setups priced at ₹50,000 to ₹2,00,000, while advanced systems with extensive monitoring capabilities range from ₹3,00,000 to ₹10,00,000, ensuring compliance with stringent safety standards for Hyperloop travel. ",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/A95xFEOWmJOZ4puUhqXt4QQuEq9lbsowMcsLUuwbmA3NdDlxeJr6kQDA3wsII-8rlmqF7ukA7yLAJgll7NqAnpis4sKpRRk3hMB_MliiVZqH667DnO47qOl5qAtcMsYadMXWk79GoOkq5oJt=s800",
    title: "Pod Integrated CO2 Fire Suppression System",
    desc: "Pod Integrated Fire Suppression System Integrated within Hyperloop pod compartments, these systems ensure fire safety by deploying CO2 flooding. Designed to mitigate fire risks in confined spaces, they boast a success rate of up to 95% in extinguishing Class A, B, and C fires. Prices vary based on pod size, ranging from ₹1,50,000 to ₹10,00,000 for smaller units and exceeding ₹50,00,000 for larger systems. Regular maintenance is essential for reliability and effectiveness, aligning with stringent safety standards for Hyperloop transportation.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/Qm__crYA230CpnSdujcLWZiv-T7VcGJ2SawybSYKNQcbhBmvyZOM1qdT4GwJwnY0nV-6YfDagpgAdzOtdO1wD4LORJU0mRv5bAlfrjKhkgddqqSZIeOQAggPL_vWjxJlK5dcyTrSOlnydb56=s800",
    title: "Portable Gas Detectors",
    desc: "Portable Gas Detectors are Handheld devices for detecting hazardous gases, offering early warnings in industrial, commercial, and emergency settings. They reduce gas-related injuries by up to 80%, facilitating prompt evacuation or mitigation. Prices range from ₹5,000 to ₹45,000 per unit for standard models, with specialized versions costing more.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/2IIRtFA32rZihg05tobCjsqJObS-hKn-xek7SDk_jT9M5_tOa40--3Yjl8GnToCQEBF8xylDB0iqN8Tu8fw-jRvl27x4Ut1mHYfkptsBPYNWdIsMrMkTd-vL4eUSKQGMqZnnsmNmF1FzDN3V=s800",
    title: "Oxygen Analyzers",
    desc: " Oxygen Analyzers Measure oxygen concentration in gases or liquids for industrial, medical, and environmental applications. Accurate analysis reduces accidents and defects by up to 90%, ensuring safety compliance. In medical settings, they monitor and control oxygen levels, improving treatment outcomes. Prices range from ₹24,500 to ₹1,00,000 per unit for standard models, with specialized versions costing more. Regular calibration and maintenance ensure accuracy and reliability. ",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/iQef-FXMKYZbKdnoBwf51-xl0Rufs-u95sQFV8sShvSzpkn7eKIk6Vs8ySuFcZNgKpygA0lkL2qvpgQIBKtnrt-6Y23XwSjXyPbm4f05M7Y3pAtzGsXkzl-uLJ4aEla7dAyYO7Bj-Sbl1DVM=s800",
    title: "Thermal Imaging Cameras",
    desc: "Thermal Imaging Cameras Detect infrared radiation to visualize temperature differences, aiding firefighting, industrial inspections, and search and rescue. They increase detection rates of defects by up to 80%, reducing equipment failures. In firefighting and search and rescue, they improve response times and survival rates. Prices range from ₹42,000 to ₹5,00,000 per unit for handheld models, with specialized versions costing more. Regular maintenance ensures accuracy and reliability.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/dqTOJV-q1DfOlgxJhRryIOKA0jauQi7_Gn-ovdz6tVLlVn5n-hLUsuxu-1CZ0WciRIER8HQr-FAfsse8Ney9rhGRuYwNdatFTL9g0yb9LGzZBYcCGWfdXk9S7tVbqbrGzKLVyvZmptlxaOix=s800",
    title: "Emergency Location Transmitter (ELT)",
    desc: "Emergency Location Transmitter (ELT) are Vital distress beacons for aircraft, ships, and individuals in emergencies. They reduce search and rescue time by up to 50%, increasing survival chances by 70%. Costs range from ₹40,000 to ₹200,000 per unit. Regular testing and maintenance ensure reliability. Lifespan: approximately 10 years.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/o6NsNr-jVOFDbC-6hyHy1qdZAcoEAbYmL7SRlnPgkFNPCJEBh9YIGRw8PqPlG--O1pVg3ChG6GRDm8X1ypThMX6TK9zP-qexA25bTgT5pE_sT0wHMgoW1kPrH8LvL0qpKXHmzU90NszTdnE1=s800",
    title: "Light Transmission Smoke Detectors",
    desc: "Utilize light beams to detect smoke, effective for smoldering fires. Reduce fire-related fatalities by up to 55% and provide early warnings for smoldering fires with an 85% success rate. Costs range from ₹1,500 to ₹5,000 per unit, with a lifespan of about 10 years. Regular maintenance ensures reliability.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/ddQ5WkUAyBvf57eMhBsNGr7v8IULJvnL9ABoTou-A4agJc7vxDFqQf7_m59W5bAytnBv9Aph4CGDZV6c-zN5yc97ppLJEgiNBNBE1KhnxOp9pjsGtqC2UJyC3Kguflnhqv8G-xJ2pqaXALgB=s800",
    title: "Ionization Smoke Detectors",
    desc: " Detect fast-flaming fires with ionization technology, reducing fire-related fatalities by up to 50%. They have a 90% success rate in providing early warnings for fast-flaming fires. Costs range from ₹1,200 to ₹4,000 per unit, with a lifespan of about 10 years. Regular maintenance ensures effectiveness.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/qNPkjyxnVOA8P5Ha8--aOeVE77NdKHO_SRLfqvQztGylQlFClEfYq4Qypx7bhQz3itKR4dR1oa57hRsN4FWl0FIFlAkSPgNHU55yOvq5TgGmUObU3zBd5Yjr4yBHwELnGy6zeGC-QYwpsCtq=s800",
    title: "Aviation First Aid Kit",
    desc: "Aviation First Aid Kit Address in-flight medical emergencies with tailored supplies. Studies show they reduce incidents by 60% and improve survival rates by 40% when used by trained personnel. Costs range from ₹10,000 to ₹50,000 per kit. Regular inspection ensures compliance with aviation regulations.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/DtT5-zqjG14agy8eMGC57a9bqwJqvszc2pJKPjCxDRjdmd8C8MIIQJOnQHl5MZWPl6MfYm4z_WSKT3jKlGkKKhagvNDJ-wzCXOr9xYI0_WR7ShfebXYNZ4Wy7lLiEgdcjP1auIKbU6AHxz3I=s800",
    title: "Hand-Held Metal Detectors",
    desc: "Hand-Held Metal Detectors Locate metal objects with ranges from coins to handguns. Detection range: 2-12 inches. Modern models offer metal differentiation, reducing false alarms. Costs vary: Basic: ₹5,000 to ₹10,000 Mid-Range: ₹10,000 to ₹25,000 High-End: ₹25,000 to ₹50,000. Usage increased by 30% in the last decade for security screenings due to rising concerns.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/FQ_oLot-yWGv5oVmkZ689X-YXwmftGg_zbvzMbWYTH1bOvrDd1pvYJuATo7EZ29LBwJksZhOGMxSkc1Mn5BAsPCvTMJDP_svraQWfCZdLLTiRjET3FVTg3hHq63I4kFSHZ-jqfjTmcBXdRsh=s800",
    title: "Walk-Through Metal Detectors",
    desc: "These security screening devices detect metal objects on individuals as they pass through, with sensitivity ranging from coins to firearms. Modern models process up to 60 individuals per minute, with advanced algorithms reducing false alarms. Costs vary based on features:Basic Models: ₹100,000 to ₹200,000Mid-Range Models: ₹200,000 to ₹500,000 High-End Models: ₹500,000 to ₹1,000,000. They are crucial for maintaining security in public buildings, airports, and other high-risk areas, offering varying levels of detection capabilities to suit different security needs.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/1FLOZdPlRQgN6YKomMYtfr7AQgmKqa20g_Vi8YVPh15MNwZVPw1N5PBhmwGpYAjypOayhSc6xoX2R1rZPwfXgRJu6fyhsjcZzicTzPFcHP-a2Cs1uBAPivuaR0rrjm1hdr1nSJ18ooD2hfbF=s800",
    title: "Defibrillators",
    desc: " These life-saving devices deliver electric shocks to restore normal heart rhythm during cardiac arrest. Studies indicate they can increase survival rates by up to 70%, with immediate use crucial for effectiveness. AEDs, user-friendly and portable, cost between ₹75,000 to ₹200,000 per unit, while advanced models for medical professionals range from ₹200,000 to ₹500,000. Regular maintenance ensures reliability, with AEDs lasting 5-10 years with proper care. They significantly improve survival chances when used promptly during cardiac emergencies, highlighting their critical role in public health.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/YLDbSQPos33zGhESt8Vl_TWexwqoIKZNjoszlgPKllIWpidGGkpyineCnRHLrJGiboMS9AgiL5PKhQ9vjMz25No_-UbiMYpaCD5aIkeF8NISiVrhX3Lfn88srIH0x4Z46Gv9vDFnDDjZkZ4-=s800",
    title: "Crash Axe",
    desc: " A critical tool in aviation and marine emergencies, the crash axe aids rapid extrication from aircraft or vessels during critical situations. While specific effectiveness statistics are limited, they are considered essential for first responders, enabling quick access to trapped individuals. Costs vary based on quality and features, with regular maintenance ensuring readiness for emergencies. They are integral components of emergency response procedures in ensuring swift and effective extrication.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/gN10TOgqAkvPpG5fwEV04i7k8lVL5QfPyOiPTKIPZ41NIrQn_zKof2dO7__iDs-ineQUgjbAnatp_fEx4vxSJCvj_VbcoOAOnTsot3bFMBjSg6YXdh9HEmn_yhfa1NmopFGYbR-xbhq9SU_C=s800",
    title: "Reinforced Cockpit Doors",
    desc: " These specially designed doors bolster aviation security by preventing unauthorized access to the flight deck. While specific effectiveness statistics are limited for security reasons, they are integral to aviation safety protocols post-9/11, enhancing flight deck security and passenger safety. Installation costs vary based on aircraft type and complexity, with ongoing maintenance ensuring continued effectiveness. They are a critical layer of security in safeguarding flight crews and passengers against potential threats.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/ev1Nc0hVXz3vQkf9YJn4tZM34GQCeZXd3bDouRXz8SvmBzWI7yeMdD6y50bRVyE78xo8lIKBDl1B-sCH19qOk6vPem9B7q-IwTRkTjtONzaV5Bvxo4B1Vi8hcztEKUVglNtzEUqWx0AxwnbW=s800",
    title: "Photoluminescent Floor Path Lighting",
    desc: " Utilizing photoluminescent materials, these floor markings illuminate pathways during power outages or low visibility, aiding evacuation. While specific evacuation effectiveness statistics are limited, studies suggest improved evacuation times and occupant safety. Installation costs vary based on factors like area size and material quality, with minimal maintenance expenses due to their longevity and independence from electrical power. Complementing traditional emergency lighting, they offer a cost-effective safety measure in diverse environments.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/iRrvf2Am-VgY__ylYCCTf0AitwdjGud4B6TZPO1RuLQTvv6aBWj2L2ziC7aWgTLhDYKb2L2X6Lch3YfIm0YEIJ0HSo2YHmO-VfuQiw19ew3L2n5C_qm0VEbPUpk8wYUpnV9TVbPBdPTd81S7=s800",
    title: "Passenger Briefing Safety Cards",
    desc: "Providing essential safety instructions and emergency procedures, these cards are crucial components of pre-flight or pre-voyage briefings. While specific effectiveness statistics may vary, studies suggest that passengers who review safety cards are better prepared to respond during emergencies. Production costs vary, but transportation operators include them in operational budgets to uphold passenger safety and regulatory compliance. ",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/1JNbpGIzJ9iMsuVvbDZ3j6kF2ElU4C9K94A6d825PyNe2fKht7UkDtyvVe7VlxPuqyOsOERaEw6aS7YPSGzte8m73dGzczmkeR1IUaudTYhLoDgFsverPJmny3uXs71SUv5nt-hcosrf543m=s800",
    title: "Emergency Exit Marking",
    desc: " These visual cues guide occupants to safety during evacuations, with illuminated signs and floor markings ensuring visibility even in low-light conditions. While specific effectiveness statistics are limited, studies emphasize their crucial role in reducing evacuation times and enhancing safety. Installation costs vary based on factors such as facility size and type of markings, with ongoing maintenance primarily consisting of periodic inspections and replacements.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/C6hxTuuA__9-5MEAm41Hxzt8QhvpiHwKj4Or9j-TPIIyVft120Vcs5aetwKlS2n9LKyc9SfCao8TDmzSykk0NzwhQOE4-3Phqc8j5OIY4DPkJ4eYRM3cf9iKF1AEs8gXn3uFX4EpC0LDrLWj=s800",
    title: "EVAC Horn ",
    desc: "The EVAC horn signals occupants to evacuate during emergencies with its distinctive, high-decibel sound. An integral part of fire alarm or emergency notification systems, it prompts swift evacuation, reducing response times. While specific effectiveness statistics may vary, EVAC horns are essential for emergency preparedness, with installation costs ranging from hundreds to thousands of dollars per horn. Regular maintenance ensures reliability as per industry standards and guidelines.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/GZmeQE2i8rZutntrq1GxGh-mzHEr8WEn9vSRU2U7YoPBqJgqnF-PkqwrKVxQyhv66zZTQMCNNAuv0Upr97YN6ZtBz0PeRMLzEwX1a3iHIRUomhjmxa7xd39JGwMJu6xnty1vFQOFWMk18rRp=s800",
    title: "Cabin Pressure Controller (CPC) ",
    desc: "The CPC maintains safe cabin pressure and airflow, ensuring passenger comfort amidst altitude changes. Integral to the aircraft's environmental control system, it regulates air intake and outflow, aligning with safety standards enforced by rigorous testing and certification. Though specific statistics may be proprietary, CPCs are an essential investment in aviation safety, factored into overall aircraft maintenance costs.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/vq-0kTnM3x3mYeULqZ2fSUxIunL9nYSMiWXmEFPLnQ6PHX8AMNQGgJobdAy_h5yb_hJAk03-b56LtD0oJ0fanE-08f5r_J_UrbfLfu09YM9mCHok9jDt-t67SQE8LOyXDV89GAK7Nxf3pIAJ=s800",
    title: "Fire-Resistant Silicone Material",
    desc: " Designed to endure high temperatures and flame exposure, fire-resistant silicone maintains structural integrity in extreme conditions. In Hyperloop, it enhances safety by protecting critical components, ensuring durability and reliability during high-speed travel.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/qwpfzhv21uyzENElxhcub77jGjj9WhYxGV5NGhhtULUuqLYsMuhNDANM19iXHXq64DB3FGTEdGROkyZJvzKU75V9WRHIQYQEfHJ1UppTbiG60QM4XRNwgK_D-C3SNOxVr8AMcCZTHtBIatC3=s800",
    title: "Object Detection System ",
    desc: "Utilizing AOS LiDAR technology, this system detects and tracks objects by creating detailed 3D maps using laser pulses. In Hyperloop, it enhances safety by identifying and managing obstacles, ensuring smooth and secure travel at high speeds.",
  },
  {
    imgurl:
      "https://lh7-us.googleusercontent.com/43kvZ7LoacA5Zz4BL-Ms4WzZfrDzAzvxtah5Zm1aCKWi8NyhxqQ_VZRQTf7IVy9PGxwsw5kEraCC0QaQwisUe-UBOQL-_w3P8w-VSjCi1ZdWmcoFcA_XwooLB848paY5V8paqfDHpVIhW5yP=s800",
    title: "Environmental Control and Life Support System (ECLSS)",
    desc: "ECLSS ensures safe, habitable conditions by managing air quality, temperature, humidity, water supply, and waste. In Hyperloop, it could maintain optimal air quality and temperature for passengers, enhancing safety and comfort during high-speed travel.",
  },
];

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Image.insertMany(newUrls);
    console.log("Database populated!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error connecting to database", err);
  });
