{
    init: function(elevators, floors) {
        var elevator = elevators[0]; // エレベーター1台

        // エレベーター内のボタンが押されたら目的地に追加
        elevator.on("floor_button_pressed", function(floorNum) {
            if (!elevator.destinationQueue.includes(floorNum)) {
                elevator.destinationQueue.push(floorNum);
                elevator.goToFloor(floorNum);
            }
        });

        // 各階で呼び出しボタンが押されたら対応
        floors.forEach(function(floor) {
            floor.on("up_button_pressed down_button_pressed", function() {
                // 呼び出し階を目的地に追加
                if (!elevator.destinationQueue.includes(floor.floorNum())) {
                    elevator.destinationQueue.push(floor.floorNum());
                    elevator.goToFloor(floor.floorNum());
                }
            });
        });

        // 停止したら、その階を目的地リストから削除
        elevator.on("stopped_at_floor", function(floorNum) {
            elevator.destinationQueue = elevator.destinationQueue.filter(f => f !== floorNum);
        });

        // 何もすることがないとき → 1階に戻る
        elevator.on("idle", function() {
            elevator.goToFloor(0);
        });
    },

    update: function(dt, elevators, floors) {
        // 特に何も必要なし
    }
}
