// Khởi tạo scene, camera và renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Tạo phòng
const roomGeometry = new THREE.BoxGeometry(10, 5, 10);
const roomMaterial = new THREE.MeshPhongMaterial({
  color: 0x87ceeb,
  side: THREE.BackSide,
}); // Màu sky blue
const room = new THREE.Mesh(roomGeometry, roomMaterial);
scene.add(room);

// Tạo ánh sáng
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Ánh sáng môi trường
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Ánh sáng hướng
directionalLight.position.set(0, 1, 1).normalize();
scene.add(directionalLight);

// Tạo phòng ngủ
const bedroomGeometry = new THREE.BoxGeometry(8, 5, 8);
const bedroomMaterial = new THREE.MeshPhongMaterial({
  color: 0xffe4b5, // Màu mật ong
  side: THREE.BackSide,
});
const bedroom = new THREE.Mesh(bedroomGeometry, bedroomMaterial);
bedroom.position.set(0, 0, 0);
scene.add(bedroom);

// Tạo một loader để tải ảnh
const loader = new THREE.TextureLoader();

// Địa chỉ URL của ảnh bạn muốn treo
const imageUrl =
  "https://media.loveitopcdn.com/6424/top-ung-dung-karaoke-fptshop-01.jpg";

// Sử dụng loader để tải ảnh
loader.load(
  imageUrl,
  function (texture) {
    // Khi ảnh đã tải xong, tạo hình học phẳng cho bức ảnh
    const imageGeometry = new THREE.PlaneGeometry(2.5, 2.2); // Kích thước của bức ảnh, có thể điều chỉnh cho phù hợp

    // Tạo vật liệu với texture là ảnh vừa tải
    const imageMaterial = new THREE.MeshBasicMaterial({
      map: texture,
    });

    // Tạo mesh với hình học và vật liệu
    const image = new THREE.Mesh(imageGeometry, imageMaterial);

    // Điều chỉnh vị trí của bức ảnh, giả sử treo trên bức tường bên phải
    image.position.set(3.67, -0.2, 0); // X = 2 để đặt ảnh cách xa tâm OX, Y và Z điều chỉnh tùy vào vị trí cụ thể
    image.rotation.y = -Math.PI / 2; // Quay ảnh để nó hướng về phía bức tường

    // Thêm ảnh vào cảnh
    scene.add(image);
  },
  undefined,
  function (error) {
    console.error("An error occurred while loading the image:", error);
  }
);

// Tạo đồng hồ
const clockRadius = 1;
const clockGeometry = new THREE.CircleGeometry(clockRadius, 64);
const clockMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
const clock = new THREE.Mesh(clockGeometry, clockMaterial);
clock.position.set(3.9, 1, 0); // Đặt đồng hồ ở giữa tường
clock.rotation.y = -Math.PI / 2;
// clock lật ngược lại

scene.add(clock);

// Tạo các số trên đồng hồ
const clockNumbers = [];
const numberMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
const fontLoader = new THREE.FontLoader();

fontLoader.load(
  "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
  function (font) {
    for (let i = 1; i <= 12; i++) {
      const numberGeometry = new THREE.TextGeometry(i.toString(), {
        font: font,
        size: 0.2,
        height: 0.05,
      });
      const numberMesh = new THREE.Mesh(numberGeometry, numberMaterial);
      const angle = (i / 6) * Math.PI; // Chia đồng hồ thành 12 phần
      numberMesh.position.x = Math.sin(angle) * clockRadius * 0.8;
      numberMesh.position.y = Math.cos(angle) * clockRadius * 0.8;
      numberMesh.position.z = 0.05; // Đẩy số lên một chút để không chạm vào mặt đồng hồ
      clockNumbers.push(numberMesh);
      clock.add(numberMesh);
    }
  }
);

// Tạo kim giờ
const hourHandGeometry = new THREE.BoxGeometry(0.05, 1.5, 0.05);
const hourHandMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
const hourHand = new THREE.Mesh(hourHandGeometry, hourHandMaterial);
hourHand.position.set(0, 0, 0.05); // Đặt kim giờ vào giữa đồng hồ
clock.add(hourHand);

// Tạo kim phút
const minuteHandGeometry = new THREE.BoxGeometry(0.05, 2, 0.05);
const minuteHandMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
});
const minuteHand = new THREE.Mesh(minuteHandGeometry, minuteHandMaterial);
minuteHand.position.set(0, 0, 0.05); // Đặt kim phút vào giữa đồng hồ
clock.add(minuteHand);

// Tạo kim giây
const secondHandGeometry = new THREE.BoxGeometry(0.02, 2.5, 0.02);
const secondHandMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
});
const secondHand = new THREE.Mesh(secondHandGeometry, secondHandMaterial);
secondHand.position.set(0, 0, 0.05); // Đặt kim giây vào giữa đồng hồ
clock.add(secondHand);

// Tạo cửa gỗ
const doorGeometry = new THREE.BoxGeometry(0.2, 4.5, 1);
const doorMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
const doorMesh = new THREE.Mesh(doorGeometry, doorMaterial);
doorMesh.position.set(-4, -0.5, -3.6); // Đặt cửa gỗ ở giữa phòng, phía trước
scene.add(doorMesh);

// Tạo tay nắm cửa màu vàng
const handleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);
const handleMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 }); // Màu vàng
const handleMesh = new THREE.Mesh(handleGeometry, handleMaterial);
handleMesh.position.set(-3.8, -0.3, -3.9); // Đặt tay nắm ở trên cửa, phía trước
scene.add(handleMesh);

const chairWidth = 0.5;
const chairHeight = 0.7;
const chairDepth = 0.5;
const backrestHeight = 1;
const legHeight = 1;

// Tạo ghế gỗ với chân ghế và dựa lưng, và xoay hướng về phía bàn
function createWoodenChair(x, y, z, rotationY, backrestOffset) {
  const backrestGap = -0.2; // Khoảng cách giữa dựa lưng và mép ghế

  // Tạo thân ghế
  const seatGeometry = new THREE.BoxGeometry(
    chairWidth,
    chairHeight,
    chairDepth
  );
  const seatMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
  const seat = new THREE.Mesh(seatGeometry, seatMaterial);
  seat.position.set(x, y + chairHeight / 2, z); // Đặt thân ghế ở độ cao y bằng nửa chiều cao của ghế

  // Tạo dựa lưng
  const backrestGeometry = new THREE.BoxGeometry(
    chairWidth,
    backrestHeight,
    0.1
  );
  const backrest = new THREE.Mesh(backrestGeometry, seatMaterial);
  backrest.position.set(
    x + backrestGap + backrestOffset,
    y + chairHeight + backrestHeight / 2,
    z + chairDepth / 100
  ); // Điều chỉnh vị trí của dựa lưng
  backrest.rotation.y = Math.PI / 2; // Quay dựa lưng về tường

  // Tạo chân ghế
  const legGeometry = new THREE.BoxGeometry(0.1, legHeight, 0.1);
  const legMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
  const frontLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
  const frontRightLeg = new THREE.Mesh(legGeometry, legMaterial);
  const backLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
  const backRightLeg = new THREE.Mesh(legGeometry, legMaterial);
  frontLeftLeg.position.set(
    x - chairWidth / 2 + 0.05,
    y - chairHeight / 2,
    z - chairDepth / 2 + 0.05
  );
  frontRightLeg.position.set(
    x + chairWidth / 2 - 0.05,
    y - chairHeight / 2,
    z - chairDepth / 2 + 0.05
  );
  backLeftLeg.position.set(
    x - chairWidth / 2 + 0.05,
    y - chairHeight / 2,
    z + chairDepth / 2 - 0.05
  );
  backRightLeg.position.set(
    x + chairWidth / 2 - 0.05,
    y - chairHeight / 2,
    z + chairDepth / 2 - 0.05
  );

  // Xoay ghế
  seat.rotation.y = rotationY;

  scene.add(seat);
  scene.add(backrest);
  scene.add(frontLeftLeg);
  scene.add(frontRightLeg);
  scene.add(backLeftLeg);
  scene.add(backRightLeg);
}

// Tạo ghế gỗ ở bên trái bàn
const backrestOffsetsLeft = [0, 0, 0, 0]; // Điều chỉnh offset cho dựa lưng bên trái
for (let i = 0; i < 4; i++) {
  const chairX = -2; // Điều chỉnh vị trí theo trục x để ghế đặt ở bên trái bàn
  const chairZ = -2.6 + i * 1.6; // Điều chỉnh vị trí theo trục z để ghế được cách nhau
  createWoodenChair(chairX, -2.1, chairZ, Math.PI / 2, backrestOffsetsLeft[i]);
}

// Tạo ghế gỗ ở bên phải bàn
const backrestOffsetsRight = [0.4, 0.4, 0.4, 0.4]; // Điều chỉnh offset cho dựa lưng bên phải
for (let i = 0; i < 4; i++) {
  const chairX = 2; // Điều chỉnh vị trí theo trục x để ghế đặt ở bên phải bàn
  const chairZ = -2.6 + i * 1.6; // Điều chỉnh vị trí theo trục z để ghế được cách nhau
  createWoodenChair(
    chairX,
    -2.1,
    chairZ,
    -Math.PI / 2,
    backrestOffsetsRight[i]
  );
}

// Tạo vật liệu cho nền của đènĐ
const lampBaseMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff, // Màu trắng cho nền của đèn
  shininess: 100, // Độ bóng của vật liệu
});

// Tạo đèn học
const lampBaseGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32);
const lampBase = new THREE.Mesh(lampBaseGeometry, lampBaseMaterial);
lampBase.position.set(0.1, -0.9, 2.6);
scene.add(lampBase);

// Tạo vật liệu cho chân đèn
const lampStandMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff, // Màu trắng cho chân đèn
  shininess: 100, // Độ bóng của vật liệu
});

// Tạo chân đèn
const lampStandGeometry = new THREE.CylinderGeometry(0.1, 0.05, 1, 32);
const lampStand = new THREE.Mesh(lampStandGeometry, lampStandMaterial);
lampStand.position.set(0.1, -0.5, 2.6);
scene.add(lampStand);

// Tạo vật liệu cho mặt đèn
const lampShadeMaterial = new THREE.MeshPhongMaterial({
  color: 0xffff00, // Màu vàng mặc định khi bật đèn
  shininess: 100, // Độ bóng của vật liệu
});
const lampShadeGeometry = new THREE.ConeGeometry(0.5, 0.7, 32);
const lampShade = new THREE.Mesh(lampShadeGeometry, lampShadeMaterial);
lampShade.position.set(0.1, 0.37, 2.75);
scene.add(lampShade);

// Tạo vật liệu cho bóng đèn
const bulbMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff, // Màu trắng mặc định khi tắt đèn
});

// Tạo bóng đèn
const bulbGeometry = new THREE.SphereGeometry(0.05, 32, 32);
const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
bulb.position.set(3.6, -0.4, 0.4);
scene.add(bulb);

// Tạo ánh sáng của đèn
const lampLight = new THREE.SpotLight(0xffff00, 1, 5, Math.PI / 4, 1); // Màu vàng, cường độ 1, bán kính tác động 5, góc chiếu 45 độ, hàm trọng số 1
lampLight.position.set(1, 1, 0.4);
lampLight.target.position.set(0.5, -0.5, 0.4); // Đặt mục tiêu ánh sáng của đèn
scene.add(lampLight);
scene.add(lampLight.target);

// Biến để kiểm tra xem đèn học đã được bật hay chưa
let isLampOn = false;

// Lắng nghe sự kiện nhấn phím
document.addEventListener("keydown", (event) => {
  if (event.key === "b") {
    if (isLampOn) {
      // Tắt đèn nếu đã bật
      lampShadeMaterial.color.setHex(0xffffff); // Đặt màu lại cho đèn
      lampLight.intensity = 0; // Tắt ánh sáng của đèn
      bulbMaterial.color.setHex(0xffff00); // Đặt màu lại cho bóng đèn
      isLampOn = false;
    } else {
      // Bật đèn nếu đã tắt
      lampShadeMaterial.color.setHex(0xffff00); // Đặt màu lại cho đèn
      lampLight.intensity = 3; // Bật ánh sáng của đèn
      bulbMaterial.color.setHex(0xffffff); // Đặt màu lại cho bóng đèn
      isLampOn = true;
    }
  }
});

// Tạo lọ hoa cúc
const flowerPotGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.4, 10);
const flowerPotMaterial = new THREE.MeshPhongMaterial({
  color: 0x8b4513,
});
const flowerPot = new THREE.Mesh(flowerPotGeometry, flowerPotMaterial);
flowerPot.position.set(-0.5, -0.7, 2.7);
scene.add(flowerPot);

const flowerGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const flowerMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
flower.position.set(-0.5, -0.4, 2.7);
scene.add(flower);
// Tạo ti vi
const windowFrameGeometry = new THREE.BoxGeometry(0.1, 2.2, 4);

// Màu viền trắng
const windowFrameMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff, // Màu trắng
});

// Màu bên trong đen
const windowInnerMaterial = new THREE.MeshPhongMaterial({
  color: 0x000000, // Màu đen
});

const windowMaterials = [
  windowFrameMaterial, // Mặt ngoài màu trắng
  windowInnerMaterial, // Mặt trong màu đen
];

const windowFrame = new THREE.Mesh(windowFrameGeometry, windowMaterials);
windowFrame.position.set(0, 1, -4);
windowFrame.rotation.y = Math.PI / 2; // Xoay cửa sổ 90 độ

scene.add(windowFrame);

// Màu vàng cho đèn trùm
const ceilingLightMaterial = new THREE.MeshPhongMaterial({
  color: 0xffff00,
}); // Màu vàng
// Tạo bóng đèn cơ
const pointLight = new THREE.PointLight(0xffff00, 1, 10); // Màu vàng, cường độ 1, bán kính tác động 10
pointLight.position.set(0, 4.5, 0); // Đặt bóng đèn ở vị trí đèn trùm
scene.add(pointLight);

// Tạo đèn trùm
const ceilingLightGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.5); // Kích thước của đèn trùm
const ceilingLight = new THREE.Mesh(ceilingLightGeometry, ceilingLightMaterial); // Sử dụng vật liệu đã được định nghĩa trước đó
ceilingLight.position.set(0, 2.4, 0); // Đặt đèn trùm ở giữa phòng
scene.add(ceilingLight);

// Lắng nghe sự kiện nhấn phím
document.addEventListener("keydown", (event) => {
  if (event.key === "t" || event.key === "T") {
    // Chuyển sang chế độ tối
    ambientLight.intensity = 0.1;
    directionalLight.intensity = 0.1;
    pointLight.intensity = 1; // Bật bóng đèn cơ
  } else if (event.key === "z" || event.key === "Z") {
    // Chuyển sang chế độ sáng
    ambientLight.intensity = 0.5;
    directionalLight.intensity = 0.5;
    pointLight.intensity = 0; // Tắt bóng đèn cơ
  }
});
// Tạo máy tính xách tay
const laptopWidth = 0.8;
const laptopHeight = 0.05;
const laptopDepth = 0.5;

const laptopGeometry = new THREE.BoxGeometry(
  laptopWidth,
  laptopHeight,
  laptopDepth
);
const laptopMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 }); // Màu xám
const laptop = new THREE.Mesh(laptopGeometry, laptopMaterial);
laptop.position.set(1, -0.85, 2); // Đặt máy tính xách tay trên bàn
scene.add(laptop);

// Tạo máy tính xách tay
const laptopWidth1 = 0.8;
const laptopHeight2 = 0.05;
const laptopDepth3 = 0.5;

const laptopGeometry1 = new THREE.BoxGeometry(
  laptopWidth1,
  laptopHeight2,
  laptopDepth3
);
const laptopMaterial1 = new THREE.MeshPhongMaterial({ color: 0x808080 }); // Màu xám
const laptop1 = new THREE.Mesh(laptopGeometry1, laptopMaterial1);
laptop1.position.set(-0.95, -0.85, 2); // Đặt máy tính xách tay trên bàn
scene.add(laptop1);

// Tạo cửa sổ nhôm
const aluminumWindowGeometry = new THREE.BoxGeometry(0.2, 2, 1);
const aluminumWindowMaterial = new THREE.MeshPhongMaterial({
  color: 0xc0c0c0,
}); // Màu nhôm
const aluminumWindowMesh = new THREE.Mesh(
  aluminumWindowGeometry,
  aluminumWindowMaterial
);
aluminumWindowMesh.position.set(-4, 1.2, 2.5); // Đặt cửa sổ nhôm ở cùng vị trí với cửa gỗ, phía trên
scene.add(aluminumWindowMesh);

// Tạo tay nắm cửa nhôm
const aluminumHandleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 32);
const aluminumHandleMaterial = new THREE.MeshPhongMaterial({
  color: 0xc0c0c0,
}); // Màu nhôm
const aluminumHandleMesh = new THREE.Mesh(
  aluminumHandleGeometry,
  aluminumHandleMaterial
);
aluminumHandleMesh.position.set(-3.9, 1.2, 2); // Đặt tay nắm cửa nhôm ở cạnh cửa sổ
scene.add(aluminumHandleMesh);

// Tạo ngăn trên cửa sổ nhôm
const topCompartmentGeometry = new THREE.BoxGeometry(0.2, 0.5, 0.5);
const topCompartmentMaterial = new THREE.MeshPhongMaterial({
  color: 0xc0c0c0,
}); // Màu nhôm
const topCompartmentMesh = new THREE.Mesh(
  topCompartmentGeometry,
  topCompartmentMaterial
);
topCompartmentMesh.position.set(-4, 1.7, 2.5); // Đặt ngăn trên cửa sổ nhôm ở phía trên
scene.add(topCompartmentMesh);

// Tạo ngăn dưới cửa sổ nhôm
const bottomCompartmentGeometry = new THREE.BoxGeometry(0.2, 0.5, 0.5);
const bottomCompartmentMaterial = new THREE.MeshPhongMaterial({
  color: 0xc0c0c0,
}); // Màu nhôm
const bottomCompartmentMesh = new THREE.Mesh(
  bottomCompartmentGeometry,
  bottomCompartmentMaterial
);
bottomCompartmentMesh.position.set(-4, 0.7, 2.5); // Đặt ngăn dưới cửa sổ nhôm ở phía dưới
scene.add(bottomCompartmentMesh);

const conferenceTableGeometry = new THREE.BoxGeometry(6, 0.2, 4); // Kích thước của bàn họp
const conferenceTableMaterial = new THREE.MeshPhongMaterial({
  color: 0x8b4513,
}); // Màu gỗ
const conferenceTable = new THREE.Mesh(
  conferenceTableGeometry,
  conferenceTableMaterial
);
//   start
conferenceTable.position.set(0, -1, 0); // Đặt bàn họp ở giữa phòng, bên dưới mặt sàn
scene.add(conferenceTable);
const conferenceChairGeometry = new THREE.BoxGeometry(1, 1, 1); // Kích thước của ghế họp
const conferenceChairMaterial = new THREE.MeshPhongMaterial({
  color: 0x8b4513,
}); // Màu gỗ
const conferenceChair = new THREE.Mesh(
  conferenceChairGeometry,
  conferenceChairMaterial
);
conferenceChair.position.set(2, -2.1, -2); // Đặt ghế họp ở gần bàn họp
scene.add(conferenceChair);
// Quay bàn họp ra
conferenceTable.rotation.y = Math.PI / 2;

// Tạo chân bàn
const conferenceTableLegGeometry = new THREE.BoxGeometry(0.7, 2, 0.3); // Kích thước của chân bàn
const conferenceTableLegMaterial = new THREE.MeshPhongMaterial({
  color: 0x8b4513,
}); // Màu gỗ

const conferenceTableLeg1 = new THREE.Mesh(
  conferenceTableLegGeometry,
  conferenceTableLegMaterial
);
conferenceTableLeg1.position.set(-1.5, -2, 2.6); // Đặt chân bàn ở góc bàn
scene.add(conferenceTableLeg1);

const conferenceTableLeg2 = new THREE.Mesh(
  conferenceTableLegGeometry,
  conferenceTableLegMaterial
);
conferenceTableLeg2.position.set(-1.5, -2.1, -2.4); // Đặt chân bàn ở góc bàn
scene.add(conferenceTableLeg2);

const conferenceTableLeg3 = new THREE.Mesh(
  conferenceTableLegGeometry,
  conferenceTableLegMaterial
);
conferenceTableLeg3.position.set(1.5, -2.1, 2.6); // Đặt chân bàn ở góc bàn
scene.add(conferenceTableLeg3);

const conferenceTableLeg4 = new THREE.Mesh(
  conferenceTableLegGeometry,
  conferenceTableLegMaterial
);
conferenceTableLeg4.position.set(1.5, -2.1, -2.6); // Đặt chân bàn ở góc bàn
scene.add(conferenceTableLeg4);

// Tạo cốc nước uống nước
const cupGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 20, 1); // Hình trụ cốc nước uống nước
const cupMaterial = new THREE.MeshPhongMaterial({
  color: "#ffffff", // Màu xanh lam nhạt
  transparent: true,
  opacity: 1,
});
const cup = new THREE.Mesh(cupGeometry, cupMaterial);
cup.position.set(0, -0.65, 0); // Đặt cốc nước trên bàn họp
scene.add(cup);

// Tạo quai cầm cốc nước
const handleGeometry1 = new THREE.TorusGeometry(0.15, 0.05, 8, 8); // Hình quai bán nguyệt
const handleMaterial2 = new THREE.MeshPhongMaterial({ color: 0x8b4513 }); // Màu gỗ
const handle = new THREE.Mesh(handleGeometry1, handleMaterial2);
handle.rotation.x = Math.PI / 2; // Xoay quai bán nguyệt để nó nằm dọc
handle.rotation.y = Math.PI / 2; // Xoay quai bán nguyệt để nó nằm dọc
handle.position.set(0, -0.7, 0.3); // Đặt quai cầm
scene.add(handle);

// Đặt camera
camera.position.set(0, 1, 10);

// Lắng nghe sự kiện cuộn chuột (zoom)
document.addEventListener("wheel", (event) => {
  camera.position.z += event.deltaY * 0.01;
});

// Lưu trữ vị trí chuột trước đó
let mouseX = 0;
let mouseY = 0;

// Biến để kiểm tra xem phím Ctrl đã được ấn hay không
// Biến để kiểm tra xem phím Ctrl đã được ấn hay không
let ctrlPressed = false;

// Lắng nghe sự kiện keydown để kiểm tra khi nào phím Ctrl được ấn
document.addEventListener("keydown", (event) => {
  if (event.key === "Control") {
    ctrlPressed = true;
  }
});

// Lắng nghe sự kiện keyup để kiểm tra khi nào phím Ctrl được thả ra
document.addEventListener("keyup", (event) => {
  if (event.key === "Control") {
    ctrlPressed = false;
  }
});

// Lắng nghe sự kiện chuột di chuyển (pan)
document.addEventListener("mousemove", (event) => {
  if (event.buttons === 1) {
    const deltaX = event.clientX - mouseX;
    const deltaY = event.clientY - mouseY;

    // Tính toán góc quay mới của camera theo chiều y (quay ngang)
    const angleX = ((deltaX * Math.PI) / window.innerWidth) * 2;
    const angleY = ((deltaY * Math.PI) / window.innerHeight) * 2;

    // Di chuyển camera theo chiều x và y, hoặc quay ngược lại nếu Ctrl được ấn
    if (ctrlPressed) {
      camera.rotation.y += angleX;
      camera.rotation.x += angleY;
    } else {
      camera.position.x -= deltaX * 0.02;
      camera.position.y += deltaY * 0.02;
    }

    // Đảm bảo camera không di chuyển quá xa hoặc quá gần
    camera.position.x = Math.min(Math.max(camera.position.x, -10), 10);
    camera.position.y = Math.min(Math.max(camera.position.y, -10), 10);

    // Tính toán vị trí mới của camera theo chiều z
    const distance = camera.position.distanceTo(scene.position);
    const factor = 0.05; // Hệ số tốc độ di chuyển
    camera.position.z += deltaY * factor * (distance / 50);
  }
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  // Lấy thời gian hiện tại
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Quay kim giờ, kim phút và kim giây
  hourHand.rotation.z = ((hours % 12) + minutes / 60) * (Math.PI / 6);
  minuteHand.rotation.z = (minutes + seconds / 60) * (Math.PI / 30);
  secondHand.rotation.z = seconds * (Math.PI / 30);
}

animate();
