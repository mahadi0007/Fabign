import Axios from "axios";
import { API2 } from "../Api";

// for febric
const Febric = async (id, page) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return await Axios.get(`${API2}/web/fabric/${id}?page=${page}`, config);
};

const Febric2 = async (id, page) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return await Axios.get(`${API2}/web/fabric2/${id}?page=${page}`, config);
};

// for subcategory elements
const SubCategory = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return await Axios.get(`${API2}/web/sub-category/${id}`, config);
};

const SubCategory2 = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return await Axios.get(`${API2}/web/sub-category2/${id}`, config);
};

// for leaf category elements
const LeafElements = async (id, page) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return await Axios.get(`${API2}/web/element/leaf/${id}?page=${page}`, config);
};

// default request to get main image
const MainImage = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return await Axios.get(`${API2}/web/studio/default/${id}`, config);
  // return await Axios.get(
  //   `https://api.efgtailor.com/api/v1/web/studio/default/${id}`,
  //   config
  // );
};

// search febrics
const SearchFebrics = async (id, query) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return await Axios.get(
    `${API2}/web/fabric/search/${id}?query=${query}`,
    config
  );
};

// create component
const ChangeElement = async (uid, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return await Axios.post(
    `${API2}/web/studio/change-element/${uid}`,
    data,
    config
  );
};

// Change Fabric
const ChangeFabric = async (category, uid) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return await Axios.get(
    `${API2}/web/studio/change-fabric/${category}/${uid}`,
    config
  );
};

// main category
const MainCategoryElements = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return await Axios.get(`${API2}/web/element/${id}`, config);
};

const MainCategory2Elements = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return await Axios.get(`${API2}/web/element2/${id}`, config);
};

const MainButton2Elements = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return await Axios.get(`${API2}/web/button2/default/${id}`, config);
};

// change elements febric
const ChangeElementsFebric = async (data, uid) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return await Axios.post(
    `${API2}/web/studio/change-element-fabric/${uid}`,
    data,
    config
  );
};

// back details
const BackDetails = async (uid) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return await Axios.get(`${API2}/web/back-details/${uid}`, config);
};

const BackDetails2 = async (uid) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return await Axios.get(`${API2}/web/back-details2/${uid}`, config);
};

// generate back details
const GenerateBackDetails = async (element) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return await Axios.get(
    `${API2}/web/back-details/${element}/${JSON.parse(
      localStorage.getItem("fabric")
    )}`,
    config
  );

  // return await Axios.get(
  //   `https://api.efgtailor.com/back-details/${element}/${JSON.parse(
  //     localStorage.getItem("fabric")
  //   )}`,
  //   config
  // );
};

// get quality for fabric
const GetQuality = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return await Axios.get(`${API2}/web/qualities`, config);
};

// get color for fabric
const GetColor = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return await Axios.get(`${API2}/web/colors`, config);
};

// get type for fabric
const GetType = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return await Axios.get(`${API2}/web/types`, config);
};

// filter fabrics
const FilterFabrics = async (id, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  if (
    data.quality !== undefined &&
    data.color !== undefined &&
    data.type !== undefined
  ) {
    return await Axios.get(
      `${API2}/web/filter/${id}?quality=${data.quality}&color=${data.color}`,
      config
    );
  } else if (data.quality !== undefined && data.color !== undefined) {
    return await Axios.get(
      `${API2}/web/filter/${id}?quality=${data.quality}&color=${data.color}`,
      config
    );
  } else if (data.quality !== undefined && data.type !== undefined) {
    return await Axios.get(
      `${API2}/web/filter/${id}?quality=${data.quality}&type=${data.type}`,
      config
    );
  } else if (data.color !== undefined && data.type !== undefined) {
    return await Axios.get(
      `${API2}/web/filter/${id}?color=${data.color}&type=${data.type}`,
      config
    );
  } else if (data.quality !== undefined) {
    return await Axios.get(
      `${API2}/web/filter/${id}?quality=${data.quality}`,
      config
    );
  } else if (data.color !== undefined) {
    return await Axios.get(
      `${API2}/web/filter/${id}?color=${data.color}`,
      config
    );
  } else if (data.type !== undefined) {
    return await Axios.get(
      `${API2}/web/filter/${id}?type=${data.type}`,
      config
    );
  } else {
    return await Axios.get(`${API2}/web/fabric/${id}`, config);
  }
};

const Studio = {
  Febric,
  Febric2,
  SubCategory,
  SubCategory2,
  LeafElements,
  MainImage,
  SearchFebrics,
  ChangeElement,
  MainCategoryElements,
  MainCategory2Elements,
  MainButton2Elements,
  ChangeElementsFebric,
  ChangeFabric,
  BackDetails,
  BackDetails2,
  GenerateBackDetails,
  GetQuality,
  GetColor,
  GetType,
  FilterFabrics,
};

export default Studio;
