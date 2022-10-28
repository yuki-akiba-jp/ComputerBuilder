class Controller {
  static count = 0;

  static startBuildComputer() {
    const pc = new PC();
    View.createInitialPage(pc);
    Controller.getAllData(pc);
  }

  static getAllData(pc) {
    //->Object
    const cpuBrandOp = document.querySelectorAll(config.cpu.brand)[0];
    const cpuModelOp = document.querySelectorAll(config.cpu.model)[0];
    const gpuBrandOp = document.querySelectorAll(config.gpu.brand)[0];
    const gpuModelOp = document.querySelectorAll(config.gpu.model)[0];
    const ramBrandOp = document.querySelectorAll(config.ram.brand)[0];
    const ramModelOp = document.querySelectorAll(config.ram.model)[0];
    const storageBrandOp = document.querySelectorAll(config.storage.brand)[0];
    const storageModelOp = document.querySelectorAll(config.storage.model)[0];

    //CPU Data: getBrandData -> getModelData
    //GPU Data: getBrandData -> getModelData
    //RAM Data: getRamData(get ram number) -> getBrandData -> getModelData
    //Storage Data: getStorageData(get type and size) -> getBrandData -> getModelData

    Controller.getBrandData("cpu", cpuBrandOp, cpuModelOp, pc);
    Controller.getBrandData("gpu", gpuBrandOp, gpuModelOp, pc);
    Controller.getRamData(ramBrandOp, ramModelOp, pc);
    Controller.getStorageData(storageBrandOp, storageModelOp, pc);
  }

  static getBrandData(parts, brandOp, modelOp, pc) {
    //->String, NodeList, NodeList, Object
    fetch(config.url + parts)
      .then((response) => response.json())
      .then(function (data) {
        brandOp.innerHTML = `<option>-</option>`;
        let brandData = Controller.getBrand(data);
        let modelData = Controller.getModel(data);
        let benchmarkData = Controller.getBenchmark(data);
        for (let brand in brandData) {
          let option = document.createElement("option");
          option.value = brandData[brand];
          option.innerText = brandData[brand];
          brandOp.append(option);
        }
        brandOp.addEventListener("change", function () {
          Controller.getModelData(
            parts,
            brandOp,
            modelOp,
            modelData,
            benchmarkData,
            pc
          );
        });
      });
  }

  static getModelData(parts, brandOp, modelOp, modelData, benchmarkData, pc) {
    //->String, NodeList, NodeList,Array, Array, Object
    fetch(config.url + parts)
      .then((response) => response.json())
      .then(function (data) {
        modelOp.innerHTML = `<option>-</option>`;
        let selectedBrand = brandOp.value;
        PC.addBrandData(parts, selectedBrand, pc);

        if (parts == "hdd" || parts == "ssd") {
          const storageSizeOp = document.querySelectorAll(
            config.storage.size
          )[0];
          let selectedSize = storageSizeOp.value;
          let filteredStorageModel = Controller.filterStorageModel(
            selectedSize,
            modelData[selectedBrand]
          );
          Controller.addOptionList(filteredStorageModel, modelOp);
        } else if (parts == "ram") {
          const ramNumOp = document.querySelectorAll(config.ram.num)[0];
          let selectedNumber = ramNumOp.value;
          let filteredRamModel = Controller.filterRamModel(
            selectedNumber,
            modelData[selectedBrand]
          );
          Controller.addOptionList(filteredRamModel, modelOp);
        } else {
          Controller.addOptionList(modelData[selectedBrand], modelOp);
        }

        modelOp.addEventListener("change", function () {
          let selectedModel = modelOp.value;
          let selectedBenchmark = benchmarkData[selectedModel];
          PC.addModelData(parts, selectedModel, pc);
          PC.addBenchmarkData(parts, selectedBenchmark, pc);
        });
      });
  }

  static getRamData(ramBrandOp, ramModelOp, pc) {
    //->NodeList, NodeList, Object
    const ramNumOp = document.querySelectorAll(config.ram.num)[0];
    ramNumOp.addEventListener("change", function () {
      ramBrandOp.innerHTML = `<option>-</option>`;
      Controller.getBrandData("ram", ramBrandOp, ramModelOp, pc);
    });
  }

  static getStorageData(storageBrandOp, storageModelOp, pc) {
    //->NodeList, NodeList, Object
    const storageTypeOp = document.querySelectorAll(config.storage.type)[0];
    const storageSizeOp = document.querySelectorAll(config.storage.size)[0];
    storageTypeOp.addEventListener("change", function () {
      storageSizeOp.innerHTML = `<option>-</option>`;
      let selectedStorageType = storageTypeOp.value;
      pc.storageType = selectedStorageType;
      if (selectedStorageType == "HDD") {
        Controller.getStorageSizeData("hdd");
        storageSizeOp.addEventListener("change", function () {
          storageBrandOp.innerHTML = `<option>-</option>`;
          let selectedSize = storageSizeOp.value;
          PC.addStorageSizeData(selectedSize, pc);
          Controller.getBrandData("hdd", storageBrandOp, storageModelOp, pc);
        });
      } else {
        Controller.getStorageSizeData("ssd");
        storageSizeOp.addEventListener("change", function () {
          storageModelOp.innerHTML = `<option>-</option>`;
          let selectedSize = storageSizeOp.value;
          PC.addStorageSizeData(selectedSize, pc);
          Controller.getBrandData("ssd", storageBrandOp, storageModelOp, pc);
        });
      }
    });
  }

  static addOptionList(arr, op) {
    arr.forEach((word) => {
      let option = document.createElement("option");
      option.value = word;
      option.innerText = word;
      op.append(option);
    });
  }

  static getStorageSizeData(type) {
    //->String
    fetch(config.url + type)
      .then((response) => response.json())
      .then(function (data) {
        const storageSizeOp = document.querySelectorAll(config.storage.size)[0];
        let storagemodelData = Controller.getStorageModel(data);
        let storageSizeList = Controller.getStorageSizeList(storagemodelData);
        Controller.addOptionList(storageSizeList, storageSizeOp);
      });
  }

  static getStorageSizeList(storageModelData) {
    //->Object
    let storageModelList = Object.keys(storageModelData);
    let tbSizeList = [];
    let gbSizeList = [];

    storageModelList.forEach((model) => {
      if (model.includes("TB"))
        tbSizeList.push(parseFloat(model.replace("TB", "")));
      else gbSizeList.push(parseFloat(model.replace("GB", "")));
    });

    let sortedTb = tbSizeList
      .sort((a, b) => b - a)
      .map((x) => x.toString() + "TB");
    let sortedGb = gbSizeList
      .sort((a, b) => b - a)
      .map((x) => x.toString() + "GB");
    return sortedTb.concat(sortedGb);
  }

  static getBrand(data) {
    //->Array
    let brandData = {};
    for (let i in data) {
      let currentData = data[i];
      if (brandData[currentData.Brand] == undefined)
        brandData[currentData.Brand] = currentData.Brand;
    }
    return brandData;
  }

  static getModel(data) {
    //->Array
    let modelData = {};
    for (let i in data) {
      let currentData = data[i];
      if (modelData[currentData.Brand] == undefined)
        modelData[currentData.Brand] = [currentData.Model];
      else modelData[currentData.Brand].push(currentData.Model);
    }
    return modelData;
  }

  static getBenchmark(data) {
    //->Array
    let benchmarkData = {};
    for (let i in data) {
      let currentData = data[i];
      if (benchmarkData[currentData.Model] == undefined)
        benchmarkData[currentData.Model] = currentData.Benchmark;
    }
    return benchmarkData;
  }

  static getStorageModel(data) {
    //->Array
    let modelData = {};
    for (let i in data) {
      let currentData = Controller.getStorageSizeString(data[i].Model);
      if (modelData[currentData] == undefined)
        modelData[currentData] = currentData;
    }
    return modelData;
  }

  static getStorageSizeString(storageModel) {
    //->String
    let storageSize = storageModel
      .split(" ")
      .filter((word) => word.includes("GB") || word.includes("TB"))
      .join("");
    return storageSize;
  }

  static filterStorageModel(size, storageModelData) {
    //->String, Array
    let storageModelList = Object.values(storageModelData);
    return storageModelList.filter((word) => word.includes(" " + size));
  }

  static filterRamModel(number, ramModelData) {
    //->String, Array
    let ramModelList = Object.values(ramModelData);
    return ramModelList.filter((word) => word.includes(number + "x"));
  }

  static clickAddPc(pc) {
    //->Object
    let modelList = [pc.cpuModel, pc.gpuModel, pc.ramModel, pc.storageModel];
    let gamingScore = PC.getGamingBenchmark(pc);
    let workScore = PC.getWorkBenchmark(pc);
    for (let i = 0; i < modelList.length; i++) {
      if (modelList[i] == null) return alert("Please fill in all forms.");
    }
    Controller.count++;
    return View.createbuiltPcPage(pc, gamingScore, workScore, Controller.count);
  }
}
