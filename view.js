class View {
  static createInitialPage(pc) {
    const parent = config.parent;
    let container = document.createElement("div");
    container.classList.add("bg-white");
    container.innerHTML = `
            <div class="bg-dark col-12 d-flex justify-content-center align-items-center">
                <h1 class="text-white text-center">Build Your Own Computer</h1>
            </div>
            <div class="m-2 pt-3">
                <h4>step1: Select Your CPU</h4>
            </div>
            <div class="p-2 d-flex justify-content-start flex-column d-sm-flex flex-sm-row justify-content-sm-start align-items-sm-center">
                <h5>Brand</h5>
                <select class="mx-3 col-9 col-sm-3 custom-select" id="cpuBrand">
                    <option>-</option>
                </select>
                <h5>Model</h5>
                <select class="mx-3 col-9 col-sm-3 custom-select" id="cpuModel">
                    <option>-</option>
                </select>        
            </div>
            <div class="m-2 pt-3">
                <h4>step2: Select Your GPU</h4>
            </div>
            <div class="p-2 d-flex justify-content-start flex-column d-sm-flex flex-sm-row justify-content-sm-start align-items-sm-center">
                <h5>Brand</h5>
                <select class="mx-3 col-9 col-sm-3 custom-select" id="gpuBrand">
                    <option>-</option>
                </select>
                <h5>Model</h5>
                <select class="mx-3 col-9 col-sm-3 custom-select" id="gpuModel">
                    <option>-</option>
                </select>        
            </div>
            <div class="m-2 pt-3">
                <h4>step3: Select Your Memory Card</h4>
            </div>
            <div class="p-2 d-flex justify-content-start flex-column d-sm-flex flex-sm-row justify-content-sm-start align-items-sm-center">
                <h5>How many?</h5>
                <select class="mx-3 col-9 col-sm-1 custom-select" id="ramNum">
                    <option>-</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
                <h5>Brand</h5>
                <select class="mx-3 col-9 col-sm-3 custom-select" id="ramBrand">
                    <option>-</option>
                </select>
                <h5>Model</h5>
                <select class="mx-3 col-9 col-sm-3 custom-select" id="ramModel">
                    <option>-</option>
                </select>        
            </div>
            <div class="m-2 pt-3">
                <h4>step4: Select Your Storage</h4>
            </div>
            <div class="p-2 d-flex justify-content-start flex-column d-sm-flex flex-sm-row justify-content-sm-start align-items-sm-center">
                <h5>HDD or SSD</h5>
                <select class="mx-3 col-9 col-sm-2 custom-select" id="storageType">
                    <option>-</option>
                    <option>HDD</option>
                    <option>SSD</option>
                </select>
                <h5>Storage</h5>
                <select class="mx-3 col-9 col-sm-2 custom-select" id="storageSize">
                    <option>-</option>
                </select>
                <h5>Brand</h5>
                <select class="mx-3 col-9 col-sm-2 custom-select" id="storageBrand">
                    <option>-</option>
                </select>
                <h5>Model</h5>
                <select class="mx-3 col-9 col-sm-2 custom-select" id="storageModel">
                    <option>-</option>
                </select>        
            </div>
            <div>
                <button type="submit" class="my-3 ml-3 btn btn-primary col-2" id="addPc">Add PC</button>
            </div>
            <div id="displayPC">
            </div>
        
        `;
    parent.append(container);

    const addPcBtn = document.querySelectorAll("#addPc")[0];
    addPcBtn.addEventListener("click", function () {
      Controller.clickAddPc(pc);
    });

    return parent;
  }

  static createbuiltPcPage(pc, gamingScore, workScore, count) {
    //->Object, int, int, int
    const container = document.querySelectorAll("#displayPC")[0];
    let div = document.createElement("div");
    div.classList.add("bg-primary", "text-white", "m-2", "col-12");
    div.innerHTML = `
        <div class="m-2 pt-3 d-flex justify-content-center">
            <h1>Your PC${count}</h1>
        </div>
        <div class="m-2 pt-3 d-flex flex-column">
            <h1>CPU</h1>
            <h5>Brand: ${pc.cpuBrand}</h5>
            <h5>Model: ${pc.cpuModel}</h5>
        </div>
        <div class="m-2 pt-3 d-flex flex-column">
            <h1>GPU</h1>
            <h5>Brand: ${pc.gpuBrand}</h5>
            <h5>Model: ${pc.gpuModel}</h5>
        </div>
        <div class="m-2 pt-3 d-flex flex-column">
            <h1>RAM</h1>
            <h5>Brand: ${pc.ramBrand}</h5>
            <h5>Model: ${pc.ramModel}</h5>
        </div>
        <div class="m-2 pt-3 d-flex flex-column">
            <h1>Storage</h1>
            <h5>Disk: ${pc.storageType}</h5>
            <h5>Storage: ${pc.storageSize}</h5>
            <h5>Brand: ${pc.storageBrand}</h5>
            <h5>Model: ${pc.storageModel}</h5>
        </div>
        <div class="m-2 pt-3 d-flex justify-content-around align-items-center">
            <h1>Gaming: ${gamingScore}%</h1>
            <h1>Work: ${workScore}%</h1>
        </div>
        `;
    container.append(div);
    return container;
  }
}
