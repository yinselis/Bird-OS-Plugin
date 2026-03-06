jQuery(async () => {
    // 1. 暴力生成一个右下角的粉色悬浮球（绝对不会被隐藏）
    const buttonHtml = `
        <div id="bird-os-floating-btn" style="position: fixed; bottom: 80px; right: 20px; width: 50px; height: 50px; background: #ff80ab; border-radius: 50%; display: flex; justify-content: center; align-items: center; box-shadow: 0 4px 15px rgba(255,128,171,0.5); z-index: 99999; cursor: pointer;">
            <i class="fa-solid fa-mobile-screen" style="color: white; font-size: 24px;"></i>
        </div>
    `;
    
    // 直接塞进网页的身体里，不依赖任何酒馆菜单
    $('body').append(buttonHtml);

    // 2. 点击悬浮球，弹出你的手机界面
    $('#bird-os-floating-btn').on('click', function () {
        // 如果已经打开了，就关掉
        if ($('#bird-os-popup').length > 0) {
            $('#bird-os-popup').remove();
            return;
        }

        // 手机端弹窗
        const popupHtml = `
            <div id="bird-os-popup" style="position:fixed; top:5%; left:50%; transform:translateX(-50%); width:95%; max-width:400px; height:85%; z-index:100000; border-radius:30px; box-shadow:0 20px 50px rgba(0,0,0,0.5); overflow:hidden; border: 6px solid #333; background: #fff;">
                <div style="background:#333; height:30px; display:flex; justify-content:flex-end; padding-right:15px; align-items:center;">
                    <button id="bird-os-close" style="background:#ff3b30; border:none; width:14px; height:14px; border-radius:50%; cursor:pointer;"></button>
                </div>
                
                <!-- ⚠️注意：如果弹出来是白屏，说明下面这行路径里的 Bird-OS-Plugin 名字不对，要改成你实际的 GitHub 仓库名 -->
                <iframe src="/scripts/extensions/third-party/Bird-OS-Plugin/index.html" style="width:100%; height:calc(100% - 30px); border:none;"></iframe>
            </div>
        `;
        $('body').append(popupHtml);

        // 绑定关闭按钮
        $('#bird-os-close').on('click', () => $('#bird-os-popup').remove());
    });
});
