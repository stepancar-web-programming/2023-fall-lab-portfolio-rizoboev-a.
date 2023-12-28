function drawChart() {
    const ctx = document.getElementById('chart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023' ],
            datasets: [
                {
                    label: 'C++',
                    data: [32, 43, 13, 40],
                    borderColor: '#F00',
                    backgroundColor: '#F00'
                },
                {
                    label: 'C#',
                    data: [47, 96, 76, 90],
                    borderColor: '#BD00FF',
                    backgroundColor: '#BD00FF'
                },
                {
                    label: 'Pawn',
                    data: [35, 65, 16, 85],
                    borderColor: '#0F0',
                    backgroundColor: '#0F0'
                },
                {
                    label: 'Python',
                    data: [0, 15, 32, 40],
                    borderColor: '#F3FF00',
                    backgroundColor: '#F3FF00'
                },
                {
                    label: 'Java',
                    data: [0, 48, 23, 12],
                    borderColor: '#FFA600',
                    backgroundColor: '#FFA600'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Языки программирования'
                }
            }
        }
    });
}

$(document).ready(function() {
    function submitContact() {
        event.preventDefault();

        const formData = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            message: $('#message').val()
        };

        const discordWebhookUrl = 'https://discord.com/api/webhooks/1176899644391948299/0aiSmNEpooTGX_Us2qkinTIxtO2TGY4XiqMbawT-yL5uiNYUyE9NPbIe_aN9MSI0uri7';

        $.ajax({
            url: discordWebhookUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                embeds: [{
                    title: "Получено новое сообщение",
                    description: 'Сообщение:\n' + formData.message,
                    fields: [
                        { name: 'Имя', value: formData.firstName, inline: true },
                        { name: 'Фамилия', value: formData.lastName, inline: true },
                        { name: 'E-mail', value: formData.email || 'Тут небо', inline: false }
                    ],
                    color: 5814783
                }]
            }),
            success: function(response) {
                new Toast({
                    message: 'Ваше сообщение успешно отправлено.',
                    type: 'success'
                });
            },
            error: function(xhr, status, error) {
                new Toast({
                    message: 'Во время отправки сообщения произошла ошибка. Подробности в консоли.',
                    type: 'danger'
                });

                console.error('Submission failed:', error);
            }
        });
    }

    $('.needs-validation').submit(submitContact);
});