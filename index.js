jQuery(async () => {
    const extensionName = "Bird-OS-Plugin"; 
    const extensionFolderPath = `/scripts/extensions/third-party/${extensionName}`;

    // 延迟1秒执行，确保酒馆的界面已经完全加载完毕
    setTimeout(() => {
        // 在你截图的那个“扩展面板”最上方，画一个粉色的控制台
        const settingsHtml = `
            <div class="list-group-item" style="border: 2px solid #ff80ab; border-radius: 10px; padding: 15px; margin-bottom: 10px; background: rgba(255, 128, 171, 0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-weight: bold; color: #ff80ab; font-size: 16px;">
                        <i class="fa-solid fa-mobile-screen" style="margin-right: 5px;"></i> 鸟OS 陪伴系统
                    </div>
                    <div id="bird-os-open-btn" class="menu_button" style="margin: 0; padding: 5px 15px; background: #ff80ab; color: white; border-radius: 5px; cursor: pointer;">
                        打开系统
                    </div>
                </div>
            </div>
        `;
        
        // 强行塞进扩展列表里
        $('#extensions_settings').prepend(settingsHtml);

        // 绑定“打开系统”按钮的点击事件
        $('#bird-os-open-btn').on('click', function() {
            if ($('#bird-os-popup').length > 0) return; // 防止重复打开

            const popupHtml = `
                <div id="bird-os-popup" style="position:fixed; top:5%; left:50%; transform:translateX(-50%); width:95%; max-width:400px; height:85%; z-index:99999; border-radius:30px; box-shadow:0 20px 50px rgba(0,0,0,0.5); overflow:hidden; border: 6px solid #333; background: #fff;">
                    <div style="background:#333; height:30px; display:flex; justify-content:flex-end; padding-right:15px; align-items:center;">
                        <button id="bird-os-close" style="background:#ff3b30; border:none; width:14px; height:14px; border-radius:50%; cursor:pointer;"></button>
                    </div>
                    <iframe src="${extensionFolderPath}/index.html" style="width:100%; height:calc(100% - 30px); border:none;"></iframe>
                </div>
            `;
            $('body').append(popupHtml);
            
            // 绑定红色的关闭按钮
            $('#bird-os-close').on('click', () => $('#bird-os-popup').remove());
        });
    }, 1000); // 1000毫秒 = 1秒
});
