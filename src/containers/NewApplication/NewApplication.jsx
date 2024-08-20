import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import { Alert, Button, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createApplication,
  getBxRegions,
  getBxSquares,
  getLocationsList,
  getRegions
} from "../../features/dataThunk";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from "@mui/material/Typography";
import {
  resetApplicationRes,
  resetCreateApplicationErrorMessage
} from "../../features/dataSlice";
import './newApplication.css';
import { useNavigate } from "react-router-dom";

const AddressForm = lazy(() => import('../../components/CreateApplicationComponents/AddressForm/AddressForm'));
const ApplicationStatus = lazy(() => import('../../components/CreateApplicationComponents/ApplicationStatus/ApplicationStatus'));
const ImageFiles = lazy(() => import('../../components/CreateApplicationComponents/ImageFiles/ImageFiles'));
const Description = lazy(() => import('../../components/CreateApplicationComponents/Description/Description'));
const AboutAbon = lazy(() => import('../../components/CreateApplicationComponents/AboutAbon/AboutAbon'));
const ConfirmApplicationModal = lazy(() => import('../../components/CreateApplicationComponents/ConfirmApplicationModal/ConfirmApplicationModal'));
const ApplicationResModal = lazy(() => import('../../components/CreateApplicationComponents/ApplicationResModal/ApplicationResModal'));

const formTabTitles = [
  'Адрес',
  'Статус заявки',
  'Загрузка фото',
  'Описание',
  'О абоненте'
];

const NewApplication = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    bxRegions,
    bxSquares,
    createApplicationErrorMessage,
    applicationRes,
  } = useAppSelector(state => state.dataState);
  const [state, setState] = useState({
    region: null,
    city: null,
    district: null,
    street: null,
  });
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [addressType, setAddressType] = useState('house');
  const [currentTab, setCurrentTab] = useState(0);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [applicationResModalOpen, setApplicationResModalOpen] = useState(false);
  
  const handleSnackBarClose = useCallback(() => {
    setSnackBarOpen(false);
  }, []);
  
  useEffect(() => {
    dispatch(getRegions());
    dispatch(getBxRegions());
    dispatch(getBxSquares());
    return () => {
      handleSnackBarClose();
      dispatch(resetCreateApplicationErrorMessage());
    }
  }, [
    dispatch,
    handleSnackBarClose
  ]);
  
  useEffect(() => {
    if (createApplicationErrorMessage) setSnackBarOpen(true);
  }, [createApplicationErrorMessage]);
  
  useEffect(() => {
    if (applicationRes) {
      handleConfirmModalClose();
      setApplicationResModalOpen(true);
    }
  }, [applicationRes]);
  
  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;
    
    setState(prevState => (
      {
        ...prevState,
        [name]: [
          'userPhoneNumber',
          'userAdditionalPhoneNumber',
          'domoPhone',
          'diccount_ls',
        ].includes(name) ? formatPhoneNumber(value) : value,
      }
    ));
    
    if (name === 'region') {
      setState(prevState => (
        {
          ...prevState,
          city: null,
          district: null,
          street: null,
          house: null,
          exactAddress: '',
          region2: bxRegions?.filter(region => value?.name?.toLowerCase()?.includes(region?.VALUE?.toLowerCase()))[0],
          district2: null,
        }
      ));
      dispatch(getLocationsList({
        addressType: 'cities',
        locationType: addressType,
        parentId: value?.hydra_id
      }));
    } else if (name === 'city') {
      setState(prevState => (
        {
          ...prevState,
          district: null,
          street: null,
          house: null,
          exactAddress: '',
          district2: null,
        }
      ));
      dispatch(getLocationsList({
        addressType: 'districts',
        locationType: addressType,
        parentId: value?.hydra_id
      }));
    } else if (name === 'district') {
      setState(prevState => (
        {
          ...prevState,
          street: null,
          house: null,
          exactAddress: '',
          district2: getDist2(value?.name),
        }
      ));
      dispatch(getLocationsList({
        addressType: 'streets',
        locationType: addressType,
        parentId: value?.hydra_id
      }));
    } else if (name === 'street') {
      setState(prevState => (
        {
          ...prevState,
          house: null,
          exactAddress: '',
          entrance: '',
          floor: '',
          apart: '',
        }
      ));
      dispatch(getLocationsList({
        addressType: 'houses',
        locationType: addressType,
        parentId: value?.hydra_id
      }));
    }
  };
  
  const handleImageChange = (e, fieldName) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setState(prevState => (
      {
        ...prevState,
        [fieldName]: file,
      }
    ));
  };
  
  const removeImage = (key) => {
    setState(prevState => (
      {
        ...prevState,
        [key]: null,
      }
    ));
  };
  
  const handleConfirmModalClose = () => setConfirmModalOpen(false);
  
  const handleApplicationResModalClose = () => {
    setApplicationResModalOpen(false);
    dispatch(resetApplicationRes());
    setCurrentTab(0);
    navigate('/my-applications');
  }
  
  const onAddressTypeChange = value => {
    setAddressType(value);
    setState(prevState => (
      {
        ...prevState,
        region: null,
        city: null,
        district: null,
        street: null,
      }
    ));
  };
  
  const getDist2 = (dist2name) => {
    const dists = [
      ...bxSquares['Чуй'],
      ...bxSquares['Талас'],
      ...bxSquares['Иссык-Куль'],
      ...bxSquares['Нарын'],
      ...bxSquares['Джалал-Абад'],
      ...bxSquares['Ош'],
    ]
    if (dist2name === 'с. Дружба') return dists.filter(bxSquare => bxSquare.VALUE === 'Дружба')[0];
    if (dist2name === 'г. Шопоков') return dists.filter(bxSquare => bxSquare.VALUE === 'Шопоков')[0];
    if (dist2name === 'с. Романовка') return dists.filter(bxSquare => bxSquare.VALUE === 'Романовка')[0];
    if (dist2name === 'с. Гавриловка') return dists.filter(bxSquare => bxSquare.VALUE === 'Гавриловка')[0];
    if (dist2name === 'г. Кара-Балта') return dists.filter(bxSquare => bxSquare.VALUE === 'Кара-Балта')[0];
    if (dist2name === 'с. Станция Ивановка') return dists.filter(bxSquare => bxSquare.VALUE === 'Ст.Ивановка')[0];
    if (dist2name === 'с. Кенбулун') return dists.filter(bxSquare => bxSquare.VALUE === 'Кенбулун')[0];
    if (dist2name === 'с. Сокулук') return dists.filter(bxSquare => bxSquare.VALUE === 'Сокулук')[0];
    if (dist2name === 'ж/м. Биримдик-Кут') return dists.filter(bxSquare => bxSquare.VALUE === 'Биримдик Кут')[0];
    if (dist2name === 'ж/м. Ак-Бата') return dists.filter(bxSquare => bxSquare.VALUE === 'Ак-бата')[0];
    if (dist2name === 'ж/м. Дордой') return dists.filter(bxSquare => bxSquare.VALUE === 'Дордой')[0];
    if (dist2name === 'ж/м. Келечек') return dists.filter(bxSquare => bxSquare.VALUE === 'Келечек')[0];
    if (dist2name === 'ж/м. Калыс-Ордо') return dists.filter(bxSquare => bxSquare.VALUE === 'Калыс-ордо')[0];
    if (dist2name === 'г. Кант') return dists.filter(bxSquare => bxSquare.VALUE === 'Кант')[0];
    if (dist2name === 'г. Каинды') return dists.filter(bxSquare => bxSquare.VALUE === 'Кайынды')[0];
    if (dist2name === 'с. Чалдовар') return dists.filter(bxSquare => bxSquare.VALUE === 'Чалдовар')[0];
    if (dist2name === 'с. Новопавловка') return dists.filter(bxSquare => bxSquare.VALUE === 'Новопавловка')[0];
    if (dist2name === 'ж/м. Карагачова Роща') return dists.filter(bxSquare => bxSquare.VALUE === 'Карагачевая роща')[0];
    if (dist2name === 'с. Маевка') return dists.filter(bxSquare => bxSquare.VALUE === 'Маевка')[0];
    if (dist2name === 'с. Таш-Булак') return dists.filter(bxSquare => bxSquare.VALUE === 'Таш-Булак')[0];
    if (dist2name === 'с. Юрьевка') return dists.filter(bxSquare => bxSquare.VALUE === 'Юрьевка')[0];
    if (dist2name === 'ж/м. Кок-Жар') return dists.filter(bxSquare => bxSquare.VALUE === 'Кок-жар-1 Чуй' || bxSquare.VALUE === 'Кок-жар-2 Чуй')[0];
    if (dist2name === 'с. Тельман') return dists.filter(bxSquare => bxSquare.VALUE === 'Тельман Чуй')[0];
    if (dist2name === 'с. Сын-Таш') return dists.filter(bxSquare => bxSquare.VALUE === 'Сынташ Чуй')[0];
    if (dist2name === 'с. Нурманбет') return dists.filter(bxSquare => bxSquare.VALUE === 'Нурманбет Чуй')[0];
    if (dist2name === 'ж/м. Алтын-Ордо') return dists.filter(bxSquare => bxSquare.VALUE === 'Алтын-ордо Чуй')[0];
    if (dist2name === 'с. Рот-Фронт') return dists.filter(bxSquare => bxSquare.VALUE === 'Рот-фронт Чуй')[0];
    if (dist2name === 'с. Асылбаш') return dists.filter(bxSquare => bxSquare.VALUE === 'Асылбаш Чуй')[0];
    if (dist2name === 'с. Жетиген') return dists.filter(bxSquare => bxSquare.VALUE === 'Жетиген Чуй')[0];
    if (dist2name === 'с. Алексеевка') return dists.filter(bxSquare => bxSquare.VALUE === 'Алексеевка Чуй')[0];
    if (dist2name === 'ж/м. Ак-Босого') return dists.filter(bxSquare => bxSquare.VALUE === 'Ак-босого Чуй' || bxSquare.VALUE === 'Ак-босого1 Чуй' || bxSquare.VALUE === 'Ак-босого2 Чуй' || bxSquare.VALUE === 'Ак-босого3 Чуй')[0];
    if (dist2name === 'с. Совхоз Ала-Тоо') return dists.filter(bxSquare => bxSquare.VALUE === 'Ала-тоо сары-жон Чуй')[0];
    if (dist2name === 'с. Джал') return dists.filter(bxSquare => bxSquare.VALUE === 'Село Джал Чуй')[0];
    if (dist2name === 'с. Ак-Жол') return dists.filter(bxSquare => bxSquare.VALUE === 'Ак-жол Чуй')[0];
    if (dist2name === 'с. Комсомольское') return dists.filter(bxSquare => bxSquare.VALUE === 'Комсомольское Чуй')[0];
    if (dist2name === 'с. Манас') return dists.filter(bxSquare => bxSquare.VALUE === 'Манас чуй')[0];
    if (dist2name === 'с. Беш-Кунгей') return dists.filter(bxSquare => bxSquare.VALUE === 'Беш-Кунгей Чуй')[0];
    if (dist2name === 'ж/м. Аламединский рынок') return dists.filter(bxSquare => bxSquare.VALUE === 'Аламединский рынок Бишкек')[0];
    if (dist2name === 'ж/м. Западный Автовокзал') return dists.filter(bxSquare => bxSquare.VALUE === 'Западный автовокзал Бишкек')[0];
    if (dist2name === 'ж/м. Токолдош') return dists.filter(bxSquare => bxSquare.VALUE === 'Токольдош Бишкек')[0];
    if (dist2name === 'с. Кой-таш') return dists.filter(bxSquare => bxSquare.VALUE === 'Кой-Таш Чуй')[0];
    if (dist2name === 'с. Интернациональное / Бозбармак') return dists.filter(bxSquare => bxSquare.VALUE === 'Интернациональное/Босбармак')[0];
    if (dist2name === 'ж/м. Кузнечная крепость') return dists.filter(bxSquare => bxSquare.VALUE === 'Кузнечная крепость Бишкек')[0];
    if (dist2name === 'с. Ивановка') return dists.filter(bxSquare => bxSquare.VALUE === 'Ивановка')[0];
    if (dist2name === 'ж/м. Пригородное') return dists.filter(bxSquare => bxSquare.VALUE === 'Пригородное Бишкек')[0];
    if (dist2name === 'ж/м. Ак-Ордо 1') return dists.filter(bxSquare => bxSquare.VALUE === 'Ак-ордо-1 Чуй')[0];
    if (dist2name === 'ж/м. Арча-Бешик') return dists.filter(bxSquare => bxSquare.VALUE === 'Арча-Бешик Чуй')[0];
    if (dist2name === 'ж/м. Телевышка') return dists.filter(bxSquare => bxSquare.VALUE === 'Телевышка Чуй')[0];
    if (dist2name === 'ж/м. Кызыл-Аскер') return dists.filter(bxSquare => bxSquare.VALUE === 'Кызыл-Аскер Бишкек')[0];
    if (dist2name === 'ж/м. Касым') return dists.filter(bxSquare => bxSquare.VALUE === 'ж/м Касым Чуй')[0];
    if (dist2name === 'с. Гидростроитель') return dists.filter(bxSquare => bxSquare.VALUE === 'Гидростроитель Чуй')[0];
    if (dist2name === 'мкр. Этажки ГКНБ') return dists.filter(bxSquare => bxSquare.VALUE === 'Этажки ГКНБ')[0];
    if (dist2name === 'ж/м. Бакай-Ата') return dists.filter(bxSquare => bxSquare.VALUE === 'Бакай-Ата Чуй')[0];
    if (dist2name === 'с. Аламедин') return dists.filter(bxSquare => bxSquare.VALUE === 'Аламедин Чуй')[0];
    if (dist2name === 'ж/м. Кудрука (город 3)') return dists.filter(bxSquare => bxSquare.VALUE === 'Кудрука Чуй')[0];
    if (dist2name === 'ж/м. Ак-Ордо 2') return dists.filter(bxSquare => bxSquare.VALUE === 'Ак-ордо-2 Чуй')[0];
    if (dist2name === 'с. Чолпон') return dists.filter(bxSquare => bxSquare.VALUE === 'Чолпон Чуй')[0];
    if (dist2name === 'ж/м. Мурас-Ордо (Озерное)') return dists.filter(bxSquare => bxSquare.VALUE === 'Озерное Чуй')[0];
    if (dist2name === 'ж/м. Ала-Тоо 3') return dists.filter(bxSquare => bxSquare.VALUE === 'Ала-тоо 3')[0];
    if (dist2name === 'ж/м. Ак-Ордо 3') return dists.filter(bxSquare => bxSquare.VALUE === 'Ак-ордо-3 Чуй')[0];
    if (dist2name === 'Мкр Тунгуч') return dists.filter(bxSquare => bxSquare.VALUE === 'Бишкек')[0];
    if (dist2name === 'мкр 12-й') return dists.filter(bxSquare => bxSquare.VALUE === 'Бишкек')[0];
    if (dist2name === 'мкр 11-й') return dists.filter(bxSquare => bxSquare.VALUE === 'Бишкек')[0];
    if (dist2name === 'мкр 6-й') return dists.filter(bxSquare => bxSquare.VALUE === 'Бишкек')[0];
    if (dist2name === 'мкр 4-й') return dists.filter(bxSquare => bxSquare.VALUE === 'Бишкек')[0];
    if (dist2name === 'мкр Улан 1') return dists.filter(bxSquare => bxSquare.VALUE === 'Бишкек')[0];
    if (dist2name === 'мкр Улан 2') return dists.filter(bxSquare => bxSquare.VALUE === 'Бишкек')[0];
    if (dist2name === 'мкр Сейтек(Арашан)') return dists.filter(bxSquare => bxSquare.VALUE === 'Бишкек')[0];
    if (dist2name === 'Ат-Башы') return dists.filter(bxSquare => bxSquare.VALUE === 'Ат-Башы')[0];
    if (dist2name === 'Нарын') return dists.filter(bxSquare => bxSquare.VALUE === 'Нарын')[0];
    if (dist2name === 'Кочкор') return dists.filter(bxSquare => bxSquare.VALUE === 'Кочкор')[0];
    if (dist2name === 'Ача Кайынды') return dists.filter(bxSquare => bxSquare.VALUE === 'Добавить Ача Кайынды')[0];
    if (dist2name === 'Балыкчы') return dists.filter(bxSquare => bxSquare.VALUE === 'Балыкчы')[0];
    if (dist2name === 'Тамга') return dists.filter(bxSquare => bxSquare.VALUE === 'Тамга')[0];
    if (dist2name === 'Григорьевка') return dists.filter(bxSquare => bxSquare.VALUE === 'Григорьевка')[0];
    if (dist2name === 'Дархан') return dists.filter(bxSquare => bxSquare.VALUE === 'Дархан')[0];
    if (dist2name === 'Ананьево') return dists.filter(bxSquare => bxSquare.VALUE === 'Ананьево')[0];
    if (dist2name === 'Саруу') return dists.filter(bxSquare => bxSquare.VALUE === 'Саруу')[0];
    if (dist2name === 'Боконбаево') return dists.filter(bxSquare => bxSquare.VALUE === 'Боконбаево')[0];
    if (dist2name === 'Чолпон-Ата') return dists.filter(bxSquare => bxSquare.VALUE === 'Чолпон-Ата')[0];
    if (dist2name === 'Бостери') return dists.filter(bxSquare => bxSquare.VALUE === 'Бостери')[0];
    if (dist2name === 'Бактуу-Долонотуу') return dists.filter(bxSquare => bxSquare.VALUE === 'Бактуу-долонотуу')[0];
    if (dist2name === 'Кызыл-суу') return dists.filter(bxSquare => bxSquare.VALUE === 'Кызыл-Суу')[0];
    if (dist2name === 'Барскоон') return dists.filter(bxSquare => bxSquare.VALUE === 'Барскоон')[0];
    if (dist2name === 'Кара-Ой') return dists.filter(bxSquare => bxSquare.VALUE === 'Долинка')[0];
    if (dist2name === 'Жениш') return dists.filter(bxSquare => bxSquare.VALUE === 'Жениш')[0];
    if (dist2name === 'Жалгыз-Орук') return dists.filter(bxSquare => bxSquare.VALUE === 'Жалгыз-Орук')[0];
    if (dist2name === 'Бакай-Ата') return dists.filter(bxSquare => bxSquare.VALUE === 'Бакай-Ата Талас')[0];
    if (dist2name === 'Кок-Ой') return dists.filter(bxSquare => bxSquare.VALUE === 'Кок-Ой Талас')[0];
    if (dist2name === 'Кызыл-Адыр') return dists.filter(bxSquare => bxSquare.VALUE === 'Кызыл-Адыр Талас')[0];
    if (dist2name === 'Талас') return dists.filter(bxSquare => bxSquare.VALUE === 'Талас')[0];
    if (dist2name === 'Атая Огонбаева') return dists.filter(bxSquare => bxSquare.VALUE === 'Огонбаева')[0];
    if (dist2name === 'Калба') return dists.filter(bxSquare => bxSquare.VALUE === 'Калба')[0];
    if (dist2name === 'Араван') return dists.filter(bxSquare => bxSquare.VALUE === 'Араван')[0];
    if (dist2name === 'Медресе') return dists.filter(bxSquare => bxSquare.VALUE === 'Ош медресе')[0];
    if (dist2name === 'Он-Адыр') return dists.filter(bxSquare => bxSquare.VALUE === 'Ош Он-адыр')[0];
    if (dist2name === 'г. Карасуу') return dists.filter(bxSquare => bxSquare.VALUE === 'Карасуу')[0];
    if (dist2name === 'с. Жийделик') return dists.filter(bxSquare => bxSquare.VALUE === 'Жийделик')[0];
    if (dist2name === 'с. Кенжекул') return dists.filter(bxSquare => bxSquare.VALUE === 'Кенжекул')[0];
    if (dist2name === 'с.Кыргыз-Чек') return dists.filter(bxSquare => bxSquare.VALUE === 'Ош Кыргыз-чек')[0];
    if (dist2name === 'с.Нариман') return dists.filter(bxSquare => bxSquare.VALUE === 'Ош Нариман')[0];
    if (dist2name === 'с.Нурдар') return dists.filter(bxSquare => bxSquare.VALUE === 'Ош Нурдар')[0];
    if (dist2name === 'с.Шарк') return dists.filter(bxSquare => bxSquare.VALUE === 'Ош Шарк')[0];
    if (dist2name === 'с.Фуркат') return dists.filter(bxSquare => bxSquare.VALUE === 'Фуркат')[0];
    if (dist2name === 'Авиагородок') return dists.filter(bxSquare => bxSquare.VALUE === 'Ош Авиагородок')[0];
    if (dist2name === 'Ак-Тилек') return dists.filter(bxSquare => bxSquare.VALUE === 'Ак-Тилек')[0];
    if (dist2name === 'мкр Южный') return dists.filter(bxSquare => bxSquare.VALUE === 'Ош Южный')[0];
    if (dist2name === 'г. Ош') return dists.filter(bxSquare => bxSquare.VALUE === 'Ош')[0];
    if (dist2name === 'г. Базар-Коргон') return dists.filter(bxSquare => bxSquare.VALUE === 'Базар-Коргон')[0];
    if (dist2name === 'мкр Курманбек') return dists.filter(bxSquare => bxSquare.VALUE === 'ДА Курманбек')[0];
    if (dist2name === 'мкр СМУ') return dists.filter(bxSquare => bxSquare.VALUE === 'ДА Сму')[0];
    if (dist2name === 'мкр Сузак') return dists.filter(bxSquare => bxSquare.VALUE === 'ДА Сузак' || bxSquare.VALUE === 'г. Сузак')[0];
    if (dist2name === 'мкр Ынтымак') return dists.filter(bxSquare => bxSquare.VALUE === 'ДА Ынтымак')[0];
    if (dist2name === 'г. Кочкор-Ата') return dists.filter(bxSquare => bxSquare.VALUE === 'Кочкор-Ата')[0];
    if (dist2name === 'с. Благовещенка') return dists.filter(bxSquare => bxSquare.VALUE === 'Благовещенка')[0];
    if (dist2name === 'г. Токтогул') return dists.filter(bxSquare => bxSquare.VALUE === 'Токтогул')[0];
    if (dist2name === 'с. Лавдан-Кара') return dists.filter(bxSquare => bxSquare.VALUE === 'Лавдан-Кара ДЖ')[0];
    if (dist2name === 'с. Кызыл-туу') return dists.filter(bxSquare => bxSquare.VALUE === 'ДА Кызыл-туу')[0];
  };
  
  const formatPhoneNumber = (phoneNum) => {
    return phoneNum.replace(/\D/g, '');
  };
  
  const addressFormFilled = () => {
    return Boolean(state?.region && state?.city && state?.district && (
      addressType === 'flat' ? state?.entrance && state?.floor && state?.apart : state?.exactAddress
    ) && state?.region2 && state?.district2);
  };
  
  const applicationStatusFormFilled = () => {
    return Boolean(state?.orderStatus && state?.routerInstallationType && state?.tariff && state?.superTv);
  };
  
  const imagesFormFilled = () => {
    return Boolean(state?.passport1 && state?.passport2 && state?.locationScreenShot);
  };
  
  const aboutAbonFormFilled = () => {
    return Boolean(state?.providerFrom && state?.username && state?.userSirName && state?.userPhoneNumber?.length >= 9);
  };
  
  const tabDisabling = [
    addressFormFilled(),
    applicationStatusFormFilled(),
    imagesFormFilled(),
    true,
    aboutAbonFormFilled()
  ];
  
  const allTabsFilled = () => addressFormFilled() && applicationStatusFormFilled() && imagesFormFilled() && aboutAbonFormFilled();
  
  const onSubmit = async e => {
    e?.preventDefault();
    
    if (!confirmModalOpen) return setConfirmModalOpen(true);
    
    dispatch(createApplication(state));
  };
  
  const tabs = [
    <Suspense fallback={<></>}>
      <AddressForm
        state={state}
        handleChange={handleChange}
        addressType={addressType}
        onAddressTypeChange={onAddressTypeChange}
      />
    </Suspense>,
    <Suspense fallback={<></>}>
      <ApplicationStatus
        state={state}
        handleChange={handleChange}
      />
    </Suspense>,
    <Suspense fallback={<></>}>
      <ImageFiles
        state={state}
        handleImageChange={handleImageChange}
        removeImage={removeImage}
      />
    </Suspense>,
    <Suspense fallback={<></>}>
      <Description
        state={state}
        handleChange={handleChange}
      />
    </Suspense>,
    <Suspense fallback={<></>}>
      <AboutAbon
        state={state}
        handleChange={handleChange}
      />
    </Suspense>,
  ];
  
  return (
    <div className='new-application'>
      <Typography
        component='h5'
        variant='h5'
        sx={{
          m: 0,
          color: '#FFFFFF',
          textAlign: 'center',
          width: '100%',
        }}
      >{formTabTitles[currentTab]}</Typography>
      <Box
        component='form'
        onSubmit={onSubmit}
      >
        {tabs[currentTab]}
        <div className='new-application-form-btns'>
          <Button
            variant='outlined'
            sx={{ p: '5px 10px 5px 20px' }}
            onClick={() => setCurrentTab(currentTab - 1)}
            disabled={currentTab === 0}
          >
            <ArrowBackIosIcon/>
          </Button>
          <Button
            variant='outlined'
            sx={{ p: '5px 14px 5px 16px' }}
            onClick={() => setCurrentTab(currentTab + 1)}
            disabled={currentTab === 4 || !tabDisabling[currentTab]}
          >
            <ArrowForwardIosIcon/>
          </Button>
          <Button
            type='submit'
            variant='contained'
            sx={{ width: '100%' }}
            disabled={!allTabsFilled()}
          >
            Создать
          </Button>
        </div>
      </Box>
      <Snackbar
        open={snackBarOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity='error'
          variant='filled'
          sx={{ width: '100%' }}
        >
          {createApplicationErrorMessage}
        </Alert>
      </Snackbar>
      <Suspense fallback={<></>}>
        <ConfirmApplicationModal
          state={state}
          onSubmit={onSubmit}
          confirmModalOpen={confirmModalOpen}
          handleConfirmModalClose={handleConfirmModalClose}
          addressType={addressType}
        />
      </Suspense>
      <Suspense fallback={<></>}>
        <ApplicationResModal
          applicationResModalOpen={applicationResModalOpen}
          handleApplicationResModalClose={handleApplicationResModalClose}
        />
      </Suspense>
    </div>
  );
};

export default NewApplication;