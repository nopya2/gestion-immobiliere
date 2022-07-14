<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220714121904 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE level ADD faculty_id INT NOT NULL, ADD etablishment_id INT NOT NULL, ADD obtained_diploma_id INT DEFAULT NULL, ADD prepared_diploma_id INT NOT NULL, ADD code VARCHAR(255) NOT NULL, ADD created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE level ADD CONSTRAINT FK_9AEACC13680CAB68 FOREIGN KEY (faculty_id) REFERENCES faculty (id)');
        $this->addSql('ALTER TABLE level ADD CONSTRAINT FK_9AEACC1316BE0BCF FOREIGN KEY (etablishment_id) REFERENCES etablishment (id)');
        $this->addSql('ALTER TABLE level ADD CONSTRAINT FK_9AEACC137A45AADA FOREIGN KEY (obtained_diploma_id) REFERENCES diploma (id)');
        $this->addSql('ALTER TABLE level ADD CONSTRAINT FK_9AEACC135F4DC7F1 FOREIGN KEY (prepared_diploma_id) REFERENCES diploma (id)');
        $this->addSql('CREATE INDEX IDX_9AEACC13680CAB68 ON level (faculty_id)');
        $this->addSql('CREATE INDEX IDX_9AEACC1316BE0BCF ON level (etablishment_id)');
        $this->addSql('CREATE INDEX IDX_9AEACC137A45AADA ON level (obtained_diploma_id)');
        $this->addSql('CREATE INDEX IDX_9AEACC135F4DC7F1 ON level (prepared_diploma_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE level DROP FOREIGN KEY FK_9AEACC13680CAB68');
        $this->addSql('ALTER TABLE level DROP FOREIGN KEY FK_9AEACC1316BE0BCF');
        $this->addSql('ALTER TABLE level DROP FOREIGN KEY FK_9AEACC137A45AADA');
        $this->addSql('ALTER TABLE level DROP FOREIGN KEY FK_9AEACC135F4DC7F1');
        $this->addSql('DROP INDEX IDX_9AEACC13680CAB68 ON level');
        $this->addSql('DROP INDEX IDX_9AEACC1316BE0BCF ON level');
        $this->addSql('DROP INDEX IDX_9AEACC137A45AADA ON level');
        $this->addSql('DROP INDEX IDX_9AEACC135F4DC7F1 ON level');
        $this->addSql('ALTER TABLE level DROP faculty_id, DROP etablishment_id, DROP obtained_diploma_id, DROP prepared_diploma_id, DROP code, DROP created_at, DROP updated_at');
    }
}
